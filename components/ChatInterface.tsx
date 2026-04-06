import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Send, Loader2, Sparkles, Heart } from 'lucide-react';
import { Message, ConversationStage } from '../types';
import { sendMessageToGemini } from '../services/geminiService';
import { diarioData } from '../diarioData';
import { buscarContextoNoPDF } from '../services/supabaseService';

const formatMarkdown = (text: string): string => {
  let formattedText = text
    // Títulos (###)
    .replace(/### (.*?)(?:\n|$)/g, '<h3 class="text-dd-primary font-bold mt-4 mb-2 text-base border-b border-dd-primary/10 pb-1">$1</h3>')
    
    // Links do Markdown [texto](url) - Agora clicáveis e abrem em nova aba
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-dd-secondary hover:underline font-bold underline-offset-2">$1</a>')
    
    // Links diretos (URLs soltas)
    .replace(/(?<!href=")(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-dd-secondary hover:underline font-bold">$1</a>')
    
    // Destaque para a Oração da Mãe Débora
    .replace(/Oração da Mãe Débora/g, '<span class="text-dd-primary font-bold">🙏 Oração da Mãe Débora</span>')
    
    // Negrito e Listas
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-dd-dark">$1</strong>')
    .replace(/^\* (.*$)/gim, '<li class="ml-4 list-disc mb-1 text-sm">$1</li>')
    .replace(/\n/g, '<br />');

  return formattedText;
};

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [conversationStage, setConversationStage] = useState<ConversationStage>(ConversationStage.INITIAL_WELCOME);
  const [gestationWeek, setGestationWeek] = useState<number | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (conversationStage === ConversationStage.INITIAL_WELCOME) {
      const initialMsgs: Message[] = [
        {
          id: 'welcome1',
          role: 'model',
          text: "A paz, querida! Sou a assistente do Diário da Minha Gravidez. Estou aqui para caminhar com você nessa jornada de fé.",
          timestamp: new Date()
        },
        {
          id: 'welcome2',
          role: 'model',
          text: "Para eu te acolher melhor, você está gestante no momento?",
          timestamp: new Date()
        }
      ];
      setMessages(initialMsgs);
      setConversationStage(ConversationStage.AWAITING_GESTANTE_STATUS);
    }
  }, [conversationStage]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    let modelResponseText = '';
    let nextConversationStage = conversationStage;

    try {
      if (conversationStage === ConversationStage.AWAITING_GESTANTE_STATUS) {
        const lowerText = text.toLowerCase();
        if (lowerText.includes('não') || lowerText.includes('nao')) {
          modelResponseText = "Entendi, querida. Como posso te apoiar hoje?";
          nextConversationStage = ConversationStage.GENERAL_CHAT;
        } else {
          modelResponseText = "Que alegria! Em qual semana de gestação você está?";
          nextConversationStage = ConversationStage.AWAITING_WEEK;
        }
      } 
      else if (conversationStage === ConversationStage.AWAITING_WEEK) {
        const weekMatch = text.match(/\d+/);
        const weekNum = weekMatch ? parseInt(weekMatch[0], 10) : NaN;

        if (!isNaN(weekNum)) {
          setGestationWeek(weekNum);
          
          // BUSCA NO PDF (Supabase)
          const contextoPDF = await buscarContextoNoPDF(`Semana ${weekNum}`);
          const infoLocal = diarioData[weekNum];

          // PRIORIDADE: Se houver conteúdo no PDF, usa o PDF
          if (contextoPDF && contextoPDF.length > 50) {
            const promptPDF = `
              A usuária está na semana ${weekNum}. 
              Responda como Mãe Débora usando EXCLUSIVAMENTE o conteúdo do diário abaixo.
              Não use respostas curtas. Inclua a oração e formate com ###.
              
              CONTEÚDO DO PDF:
              ${contextoPDF}
            `;
            modelResponseText = await sendMessageToGemini([...messages, userMsg], text, promptPDF);
          } else {
            // Plano B: Informação local curta
            modelResponseText = `Na **${weekNum}ª semana**, nossa meditação é em **${infoLocal?.versiculo || ''}**. ${infoLocal?.reflexao || ''}`;
          }
          nextConversationStage = ConversationStage.GENERAL_CHAT;
        } else {
          modelResponseText = "Por favor, me diga apenas o número da semana (ex: 12).";
        }
      } 
      else {
        // Busca geral por temas (Alimentação, Atividade Física, etc)
        const buscaContexto = await buscarContextoNoPDF(text);
        const promptGeral = `
          Contexto do Diário: ${buscaContexto}
          Usuária na semana: ${gestationWeek || 'desconhecida'}.
          Responda com carinho sobre "${text}". Se houver links no contexto, mostre-os.
        `;
        modelResponseText = await sendMessageToGemini([...messages, userMsg], text, promptGeral);
      }

      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'model',
        text: modelResponseText,
        timestamp: new Date()
      }]);
      setConversationStage(nextConversationStage);

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, {
        id: 'error',
        role: 'model',
        text: "Tive um probleminha técnico. Pode repetir?",
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const getSuggestions = useMemo(() => {
    if (conversationStage === ConversationStage.AWAITING_GESTANTE_STATUS) return ["Sim, estou!", "Não estou."];
    if (conversationStage === ConversationStage.AWAITING_WEEK) return ["12ª semana", "20 semanas", "38 semanas"];
    return ["Atividade física", "Dicas de alimentação", "Vida espiritual", "Estou ansiosa"];
  }, [conversationStage]);

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100">
      <div className="bg-dd-primary p-4 text-white flex items-center gap-3">
        <Heart size={20} fill="white" />
        <h1 className="font-bold text-sm">Diário da Minha Gravidez</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/30">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
              msg.role === 'user' ? 'bg-dd-primary text-white' : 'bg-white text-slate-700 border border-gray-100'
            }`}>
              <div dangerouslySetInnerHTML={{ __html: formatMarkdown(msg.text) }} />
            </div>
          </div>
        ))}
        {isLoading && <div className="text-xs italic text-dd-primary animate-pulse">Mãe Débora está lendo o diário...</div>}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t bg-white">
        <div className="flex gap-2 mb-3 overflow-x-auto pb-2">
          {getSuggestions.map((s, i) => (
            <button key={i} onClick={() => handleSendMessage(s)} className="px-3 py-1 bg-dd-primary/10 text-dd-primary rounded-full text-xs whitespace-nowrap">
              {s}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
            placeholder="Escreva sua dúvida ou oração..."
            className="flex-1 bg-slate-100 border-none rounded-xl px-4 text-sm focus:ring-2 focus:ring-dd-primary"
          />
          <button onClick={() => handleSendMessage(inputValue)} className="p-2 bg-dd-primary text-white rounded-xl">
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};