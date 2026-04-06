import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Send, Loader2, Sparkles, Heart } from 'lucide-react';
import { Message, ConversationStage } from '../types';
import { sendMessageToGemini } from '../services/geminiService';
import { diarioData } from '../diarioData';

const formatMarkdown = (text: string): string => {
  let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  formattedText = formattedText.replace(/\*(.*?)\*/g, '<em>$1</em>');
  formattedText = formattedText.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-dd-secondary hover:underline">$1</a>');
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
          text: "A paz, querida! Sou a assistente do Diário da Minha Gravidez. Estou aqui para caminhar com você nessa jornada milagrosa de fé e amor.",
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
          modelResponseText = "Entendi, querida. Saiba que estamos aqui para te apoiar. Você gostaria de conversar sobre estar tentando engravidar ou sobre nosso Plano de Oração?";
          nextConversationStage = ConversationStage.AWAITING_NON_GESTANTE_TOPIC;
        } else {
          modelResponseText = "Que alegria! Essa é uma bênção maravilhosa! Em qual semana de gestação você está?";
          nextConversationStage = ConversationStage.AWAITING_WEEK;
        }
      } 
      else if (conversationStage === ConversationStage.AWAITING_WEEK) {
        const weekNumberMatch = text.match(/\d+/);
        const weekNumber = weekNumberMatch ? parseInt(weekNumberMatch[0], 10) : NaN;

        if (!isNaN(weekNumber) && weekNumber >= 1 && weekNumber <= 40) {
          setGestationWeek(weekNumber);
          const info = diarioData[weekNumber];
          if (info) {
            modelResponseText = `Que maravilha! Na **${weekNumber}ª semana**, nossa meditação é em **${info.versiculo}**.\n\n**Reflexão:** ${info.reflexao}\n\n**Oração sugerida:** ${info.oracao}\n\nComo você está se sentindo hoje?`;
          } else {
            modelResponseText = `Que bênção estar na **${weekNumber}ª semana**! Como posso orar por você hoje?`;
          }
          nextConversationStage = ConversationStage.GENERAL_CHAT;
        } else {
          modelResponseText = "Querida, por favor, me diga a semana em número (ex: '12') para eu buscar seu devocional.";
          nextConversationStage = ConversationStage.AWAITING_WEEK;
        }
      } 
      else {
        const infoSemanas = gestationWeek ? diarioData[gestationWeek] : null;
        const contextoExtra = infoSemanas 
          ? `A usuária está na semana ${gestationWeek}. Versículo: ${infoSemanas.versiculo}. Oração: ${infoSemanas.oracao}.` 
          : "Usuária não informou a semana ou não está gestante.";

        modelResponseText = await sendMessageToGemini([...messages, userMsg], text, contextoExtra);
        nextConversationStage = ConversationStage.GENERAL_CHAT;
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
        text: "Desculpe, querida, tive uma falha na conexão. Pode tentar novamente?",
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const getSuggestions = useMemo(() => {
    if (conversationStage === ConversationStage.AWAITING_GESTANTE_STATUS) return ["Sim, estou!", "Não estou gestante."];
    if (conversationStage === ConversationStage.AWAITING_WEEK) return ["Estou na 12ª semana.", "20 semanas.", "38 semanas."];
    return ["Pedido de oração", "Dúvida sobre o parto", "Versículo do dia"];
  }, [conversationStage]);

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] max-w-4xl mx-auto bg-white shadow-xl rounded-t-xl overflow-hidden border-x border-gray-100">
      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-dd-bg">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl px-5 py-3 shadow-sm ${msg.role === 'user' ? 'bg-dd-secondary/10 text-dd-dark' : 'bg-white border border-gray-100'}`}>
              {msg.role === 'model' && (
                <div className="flex items-center gap-2 mb-2 text-dd-primary font-bold text-xs uppercase">
                  <Heart size={14} fill="currentColor" /> Mãe Débora
                </div>
              )}
              <div className="whitespace-pre-wrap leading-relaxed" dangerouslySetInnerHTML={{ __html: formatMarkdown(msg.text) }} />
            </div>
          </div>
        ))}
        {isLoading && <div className="text-xs italic text-gray-400">Escrevendo com carinho...</div>}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t">
        <div className="flex gap-2 mb-3 overflow-x-auto">
          {getSuggestions.map((s, i) => (
            <button key={i} onClick={() => handleSendMessage(s)} className="px-3 py-1 bg-dd-primary/10 text-dd-primary rounded-full text-xs whitespace-nowrap">
              {s}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 p-2 border rounded-xl resize-none"
            placeholder="Escreva aqui..."
            rows={1}
          />
          <button onClick={() => handleSendMessage(inputValue)} className="p-3 bg-dd-primary text-white rounded-xl">
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};