import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Send, Loader2, Sparkles, BookOpen, Heart } from 'lucide-react';
import { Message, ConversationStage } from '../types';
import { sendMessageToGemini } from '../services/geminiService';
import { JOURNEY_DATA } from '../constants'; // Importar JOURNEY_DATA

// Helper function to format markdown to HTML
const formatMarkdown = (text: string): string => {
  // Bold: **text** -> <strong>text</strong>
  let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  // Italic: *text* -> <em>$1</em>
  formattedText = formattedText.replace(/\*(.*?)\*/g, '<em>$1</em>');
  // Detect URLs and wrap them in <a> tags
  formattedText = formattedText.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-dd-secondary hover:underline">$1</a>');
  return formattedText;
};

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Estados para gerenciar o fluxo da conversa inicial
  const [conversationStage, setConversationStage] = useState<ConversationStage>(ConversationStage.INITIAL_WELCOME);
  const [isGestante, setIsGestante] = useState<boolean | null>(null);
  const [gestationWeek, setGestationWeek] = useState<number | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Efeito para enviar as mensagens iniciais da assistente
  useEffect(() => {
    if (conversationStage === ConversationStage.INITIAL_WELCOME) {
      const initialModelMessage1: Message = {
        id: 'welcome1',
        role: 'model',
        text: "A paz, querida! Sou a assistente do Diário da Minha Gravidez. Estou aqui para caminhar com você nessa jornada milagrosa de fé e amor. Queremos orar juntas hoje ou você tem alguma dúvida sobre o Diário?",
        timestamp: new Date()
      };
      const initialModelMessage2: Message = {
        id: 'welcome2',
        role: 'model',
        text: "Para eu te acolher melhor e personalizar nosso momento, você está gestante no momento?",
        timestamp: new Date()
      };
      setMessages([initialModelMessage1, initialModelMessage2]);
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
        
        // Priorizar a detecção de respostas negativas explícitas
        if (lowerText.includes('não estou') || lowerText.includes('nao estou') || lowerText === 'não' || lowerText === 'nao' || lowerText.includes('negativo')) {
          setIsGestante(false);
          modelResponseText = "Entendi, querida. Seja qual for o seu caminho, saiba que o coração de Mãe Débora está aqui para te apoiar e orar por você. Você gostaria de conversar sobre estar **tentando engravidar**, sobre **perda gestacional** e orar por cura e consolo, sobre ter **optado por não ter filhos** mas querer apoiar o movimento, ou talvez sobre o nosso **Plano de Oração para mulheres que desejam ser mães**?";
          nextConversationStage = ConversationStage.AWAITING_NON_GESTANTE_TOPIC;
        } 
        // Depois, verificar respostas positivas explícitas
        else if (lowerText.includes('sim') || lowerText.includes('estou gestante') || lowerText.includes('estou grávida') || lowerText === 'sim' || lowerText.includes('afirmativo')) {
          setIsGestante(true);
          modelResponseText = "Que alegria, querida Mãe Débora! Essa é uma bênção maravilhosa! Em qual semana de gestação você está atualmente?";
          nextConversationStage = ConversationStage.AWAITING_WEEK;
        } 
        // Caso a resposta não seja clara, pedir para especificar
        else {
          modelResponseText = "Querida, para eu entender como posso te acolher, poderia me dizer se você está gestante com um 'sim' ou 'não', por favor?";
          nextConversationStage = ConversationStage.AWAITING_GESTANTE_STATUS;
        }
      } else if (conversationStage === ConversationStage.AWAITING_WEEK) {
        const weekNumberMatch = text.match(/\d+/); // Extrai o primeiro número da string
        const weekNumber = weekNumberMatch ? parseInt(weekNumberMatch[0], 10) : NaN;

        if (!isNaN(weekNumber) && weekNumber >= 1 && weekNumber <= 40) { // Consideramos até 40 semanas como padrão
          setGestationWeek(weekNumber);
          const weekInfo = JOURNEY_DATA.find(w => w.week === weekNumber);
          if (weekInfo) {
            modelResponseText = `Que maravilha, Mãe Débora! Na **${weekNumber}ª semana**, seu bebê está ${weekInfo.description}. A Escritura para meditação é **${weekInfo.scripture}** e o foco de oração é: **${weekInfo.prayerFocus}**. Que Deus te abençoe ricamente! Há algo mais que eu possa orar ou te ajudar hoje?`;
          } else {
            modelResponseText = `Que maravilha, Mãe Débora! Na **${weekNumber}ª semana**, seu bebê está crescendo e se desenvolvendo a cada dia, um milagre de Deus. Mesmo não tendo um devocional específico para essa semana no nosso diário ainda, meu coração está aberto para orar por qualquer necessidade sua ou do seu bebê. Há algo específico que gostaria de orar ou conversar?`;
          }
          nextConversationStage = ConversationStage.GENERAL_CHAT;
        } else {
          modelResponseText = "Querida, por favor, me diga a semana da sua gestação em número (ex: '15 semanas') para que eu possa te oferecer a oração e o devocional mais específicos!";
          nextConversationStage = ConversationStage.AWAITING_WEEK;
        }
      } else { // GENERAL_CHAT ou AWAITING_NON_GESTANTE_TOPIC
        // A lógica do Gemini agora é mais inteligente com o SYSTEM_INSTRUCTION atualizado
        // para lidar com os tópicos de não-gestantes e o chat geral.
        modelResponseText = await sendMessageToGemini(messages, text);
        if (conversationStage === ConversationStage.AWAITING_NON_GESTANTE_TOPIC) {
          // Após a primeira resposta sobre o tópico, entra em chat geral,
          // mas as sugestões ainda podem direcionar.
          nextConversationStage = ConversationStage.GENERAL_CHAT;
        }
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
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "Minha querida, houve uma falha na conexão. Verifique sua internet e tente novamente. Estou aqui aguardando.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  // Função para obter sugestões dinâmicas
  const getSuggestions = useMemo((): string[] => {
    if (conversationStage === ConversationStage.AWAITING_GESTANTE_STATUS) {
      return ["Sim, estou!", "Não estou gestante."];
    } else if (conversationStage === ConversationStage.AWAITING_WEEK) {
      return ["Estou na 12ª semana.", "Minha 20ª semana.", "Estou na 30ª semana."];
    } else if (conversationStage === ConversationStage.AWAITING_NON_GESTANTE_TOPIC) {
      return [
        "Quero orar por tentar engravidar.",
        "Converse sobre perda gestacional.",
        "Fale sobre o Plano de Oração para mulheres que desejam ser mães."
      ];
    }
    // Sugestões para GENERAL_CHAT
    return [
      gestationWeek ? `Oração para a ${gestationWeek}ª semana.` : "Qual a oração para minha semana?",
      "Sinto medo do parto, me ajude?",
      "Dicas de saúde para o 2º trimestre",
      "Como surgiu o Desperta Débora?",
      "Quais os 5 pilares de saúde?",
      "Oração para o bebê não ser um 'ídolo'?",
      "Me fale sobre o 'baby blues'.",
      "Encontrar Mãe Débora local" // Nova sugestão
    ];
  }, [conversationStage, gestationWeek]);


  return (
    <div className="flex flex-col h-[calc(100vh-64px)] max-w-4xl mx-auto bg-white shadow-xl rounded-t-xl overflow-hidden border-x border-gray-100">
      
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-dd-bg"> {/* Alterado de bg-dd-soft-bg/30 bg-pattern-dots para bg-dd-soft-bg */}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] md:max-w-[75%] rounded-2xl px-5 py-3 shadow-sm ${
                msg.role === 'user'
                  ? 'bg-dd-secondary/10 text-dd-dark rounded-br-none'
                  : 'bg-white border border-gray-100 text-gray-700 rounded-bl-none'
              }`}
            >
              {msg.role === 'model' && (
                <div className="flex items-center gap-2 mb-2 text-dd-primary">
                  <Heart size={14} fill="currentColor" />
                  <span className="text-xs font-bold uppercase tracking-wide">Mãe Débora</span>
                </div>
              )}
              <div 
                className="whitespace-pre-wrap leading-relaxed text-[15px]"
                dangerouslySetInnerHTML={{ __html: formatMarkdown(msg.text) }}
              />
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start w-full">
            <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm flex items-center gap-2">
              <Loader2 className="animate-spin text-dd-primary" size={18} />
              <span className="text-sm text-gray-500 italic">Escrevendo com carinho...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions (only if not in general chat) */}
      {conversationStage !== ConversationStage.GENERAL_CHAT && !isLoading && (
        <div className="px-4 py-2 bg-white border-t border-gray-50 overflow-x-auto whitespace-nowrap scrollbar-hide">
          <div className="flex gap-2">
            {/* Fix: getSuggestions is an array, not a function */}
            {getSuggestions.map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(suggestion)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-dd-primary/10 text-dd-primary text-xs font-medium hover:bg-dd-primary/20 transition-colors border border-dd-primary/20"
              >
                <Sparkles size={12} />
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Suggestions for GENERAL_CHAT - Always visible once in general chat */}
      {conversationStage === ConversationStage.GENERAL_CHAT && !isLoading && (
        <div className="px-4 py-2 bg-white border-t border-gray-50 overflow-x-auto whitespace-nowrap scrollbar-hide">
          <div className="flex gap-2">
            {/* Fix: getSuggestions is an array, not a function */}
            {getSuggestions.map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(suggestion)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-dd-primary/10 text-dd-primary text-xs font-medium hover:bg-dd-primary/20 transition-colors border border-dd-primary/20"
              >
                <Sparkles size={12} />
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}


      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-100">
        <div className="flex items-end gap-2 bg-white rounded-2xl p-2 border border-dd-primary/20 focus-within:border-dd-primary/50 focus-within:ring-2 focus-within:ring-dd-primary/10 transition-all shadow-md">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Digite sua dúvida, pedido de oração ou semana de gestação..."
            className="flex-1 bg-dd-bg rounded-lg border border-transparent focus:border-dd-primary/20 focus:ring-1 focus:ring-dd-primary/10 resize-none max-h-32 min-h-[50px] py-2.5 px-3 text-gray-700 placeholder-gray-400 text-base"
            rows={1}
          />
          <button
            onClick={() => handleSendMessage(inputValue)}
            disabled={!inputValue.trim() || isLoading}
            className="p-3 rounded-xl bg-dd-primary text-white shadow-md disabled:opacity-50 disabled:shadow-none hover:opacity-90 transition-all mb-0.5 active:scale-95"
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-center text-[10px] text-gray-400 mt-2">
          Lembre-se: Eu ofereço suporte espiritual e emocional. Para questões médicas, consulte seu obstetra.
        </p>
      </div>
    </div>
  );
};