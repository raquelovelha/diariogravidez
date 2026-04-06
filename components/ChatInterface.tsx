import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Send, Loader2, Sparkles, Heart } from 'lucide-react';
import { Message, ConversationStage } from '../types';
import { sendMessageToGemini } from '../services/geminiService';
import { diarioData } from '../diarioData'; // Usando o novo arquivo oficial

// Helper function to format markdown to HTML
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
            modelResponseText = `Que bênção estar na **${weekNumber}ª semana**! Como posso orar por você e pelo seu bebê hoje?`;
          }
          nextConversationStage = ConversationStage.GENERAL_CHAT;
        } else {
          modelResponseText = "Querida, por favor, me diga a semana em número (ex: '12') para eu buscar seu devocional.";
          nextConversationStage = ConversationStage.AWAITING_WEEK;
        }
      } 
      
      else {
        // CHAT GERAL: Aqui enviamos o contexto da semana para o Gemini ser inteligente
        const infoSemanas = gestationWeek ? diarioData[gestationWeek] : null;
        const contextoExtra = infoSemanas 
          ? `A usuária está na semana ${gestationWeek}. Versículo: ${infoSemanas.versiculo}. Oração: ${infoSemanas.oracao}.` 
          : "Usuária não informou a semana ou não está gestante.";

        modelResponseText = await sendMessageToGemini([...messages, userMsg], text, contextoExtra);
        nextConversationStage = ConversationStage.GENERAL_CHAT;
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: modelResponseText,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMsg]);
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

  // ... (mantenha as funções handleKeyPress e getSuggestions que você já tem)
  // Apenas certifique-se que getSuggestions usa o novo 'gestationWeek'