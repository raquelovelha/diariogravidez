import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Send, Heart, HeartPulse } from 'lucide-react';
import { Message, ConversationStage } from '../types'; 
import { sendMessageToGemini } from '../../services/geminiService';
import { buscarContextoNoPDF } from '../../services/supabaseService';

const formatMarkdown = (text: string): string => {
  return text
    .replace(/### (.*?)(?:\n|$)/g, '<h3 class="text-dd-primary font-bold mt-4 mb-2 text-base border-b border-dd-primary/10 pb-1">$1</h3>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-dd-secondary hover:underline font-bold underline-offset-2">$1</a>')
    .replace(/Oração da Mãe Débora/g, '<span class="text-dd-primary font-bold">🙏 Oração da Mãe Débora</span>')
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-dd-dark">$1</strong>')
    .replace(/> \*(.*?)\*/g, '<blockquote class="border-l-4 border-dd-primary/30 pl-4 my-2 italic text-slate-600 bg-slate-50 py-1 font-serif">$1</blockquote>')
    .replace(/\n/g, '<br />');
};

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationStage, setConversationStage] = useState<ConversationStage>(ConversationStage.INITIAL_WELCOME);
  const [gestationWeek, setGestationWeek] = useState<number | null>(null);
  const [dynamicSuggestions, setDynamicSuggestions] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (conversationStage === ConversationStage.INITIAL_WELCOME) {
      setMessages([
        { id: crypto.randomUUID(), role: 'model', text: "A paz, querida! Sou a assistente do Diário da Minha Gravidez. Estou aqui para caminhar com você.", timestamp: new Date() },
        { id: crypto.randomUUID(), role: 'model', text: "Para eu te acolher melhor, você está gestante no momento?", timestamp: new Date() }
      ]);
      setConversationStage(ConversationStage.AWAITING_GESTANTE_STATUS);
    }
  }, [conversationStage]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;
    
    const userMsgId = crypto.randomUUID();
    const userMsg: Message = { id: userMsgId, role: 'user', text, timestamp: new Date() };
    
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);
    setDynamicSuggestions([]);

    try {
      let responseData: { texto: string; sugestoes: string[] };
      let nextStage = conversationStage;
      let contexto = "";

      if (conversationStage === ConversationStage.AWAITING_GESTANTE_STATUS) {
        if (text.toLowerCase().includes('não')) {
          responseData = { 
            texto: "Entendi, querida. Como posso te apoiar hoje? Posso orar por você ou falar sobre o desejo de ser mãe?", 
            sugestoes: ["Quero engravidar", "Perda gestacional", "Sou intercessora"] 
          };
          nextStage = ConversationStage.GENERAL_CHAT;
        } else {
          responseData = { 
            texto: "Que alegria! Em qual semana você está? (Digite apenas o número)", 
            sugestoes: ["8", "12", "20", "32"] 
          };
          nextStage = ConversationStage.AWAITING_WEEK;
        }
      } 
      else if (conversationStage === ConversationStage.AWAITING_WEEK) {
        const weekMatch = text.match(/\d+/);
        const week = weekMatch ? parseInt(weekMatch[0]) : NaN;

        if (!isNaN(week)) {
          setGestationWeek(week);
          contexto = await buscarContextoNoPDF(`Semana ${week}`).catch(() => "");
          // ATUALIZADO: Passando o parâmetro da semana para o log
          responseData = await sendMessageToGemini([...messages, userMsg], text, contexto, week);
          nextStage = ConversationStage.GENERAL_CHAT;
        } else {
          responseData = { 
            texto: "Não consegui entender o número. Pode me dizer apenas a semana? Ex: 12", 
            sugestoes: ["12", "24", "40"] 
          };
        }
      } 
      else {
        const buscaTermo = gestationWeek ? `Semana ${gestationWeek}: ${text}` : text;
        contexto = await buscarContextoNoPDF(buscaTermo).catch(() => "");
        // ATUALIZADO: Passando a semana salva no estado para o log
        responseData = await sendMessageToGemini([...messages, userMsg], text, contexto, gestationWeek || undefined);
      }

      setMessages(prev => [...prev, { 
        id: crypto.randomUUID(), 
        role: 'model', 
        text: responseData.texto || "Tive um pequeno lapso, querida. Pode repetir?", 
        timestamp: new Date() 
      }]);
      
      setDynamicSuggestions(responseData.sugestoes);
      setConversationStage(nextStage);

    } catch (e: any) {
      console.error("Erro no Chat:", e);
      setMessages(prev => [...prev, { 
        id: crypto.randomUUID(), 
        role: 'model', 
        text: "Tive um probleminha técnico. Vamos tentar de novo? 🙏", 
        timestamp: new Date() 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = useMemo(() => {
    if (dynamicSuggestions.length > 0) {
      return dynamicSuggestions.map(s => ({ label: s, icon: null, prompt: s }));
    }

    if (conversationStage === ConversationStage.AWAITING_GESTANTE_STATUS) {
      return [
        { label: "Sim, estou!", icon: null, prompt: "Sim, estou gestante" }, 
        { label: "Não estou.", icon: null, prompt: "Não estou gestante" }
      ];
    }
    
    return [
      { 
        label: "Saúde", 
        icon: <HeartPulse size={14} />, 
        prompt: "Quais as dicas de saúde para este momento?" 
      }
    ];
  }, [conversationStage, dynamicSuggestions]);

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
      <div className="bg-dd-primary p-4 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Heart size={20} fill="white" />
          <h1 className="font-bold text-sm">Conversa com Mãe Débora</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/30">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
              msg.role === 'user' 
                ? 'bg-dd-primary text-white rounded-tr-none' 
                : 'bg-white text-slate-700 border border-gray-100 rounded-tl-none shadow-md'
            }`}>
              <div dangerouslySetInnerHTML={{ __html: formatMarkdown(msg.text) }} />
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="text-xs italic text-dd-primary animate-pulse ml-2">
              Mãe Débora está escrevendo...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t bg-white">
        <div className="flex gap-2 mb-3 overflow-x-auto pb-2 no-scrollbar">
          {suggestions.map((s, i) => (
            <button 
              key={i} 
              onClick={() => handleSendMessage(s.prompt || s.label)} 
              className="px-4 py-2 bg-dd-primary/5 text-dd-primary rounded-full text-xs font-bold whitespace-nowrap border border-dd-primary/10 hover:bg-dd-primary/20 transition-all active:scale-95 shadow-sm"
            >
              <span className="flex items-center gap-1">{s.icon} {s.label}</span>
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <input 
            value={inputValue} 
            onChange={(e) => setInputValue(e.target.value)} 
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputValue)} 
            placeholder="Fale com a Mãe Débora..." 
            className="flex-1 bg-slate-100 border-none rounded-xl px-4 text-sm focus:ring-2 focus:ring-dd-primary outline-none transition-all" 
          />
          <button 
            onClick={() => handleSendMessage(inputValue)} 
            disabled={!inputValue.trim() || isLoading} 
            className="p-2 bg-dd-primary text-white rounded-xl disabled:opacity-30 hover:bg-dd-primary/90 transition-colors shadow-md"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};