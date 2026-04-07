import { WeekInfo, DiarioEntry } from './types';

export const JOURNEY_DATA: WeekInfo[] = [
  {
    week: "Início",
    title: "Planejando ser Mãe",
    scripture: "Isaías 54:13",
    fullContent: "Antes mesmo da concepção, o coração já começa a gestar o desejo da maternidade. É um tempo de sondar as motivações.\n\n**A Oração:** 'Pai querido, coloca em meu coração a motivação correta. Que meu coração sempre se lembre de que, antes de ser o meu bebê, ele é o Teu bebê amado! Amém.'"
  },
  ...Array.from({ length: 40 }, (_, i) => {
    const week = i + 1;
    
    // Dados reais extraídos do seu PDF para semanas específicas
    if (week === 1) return {
      week: 1,
      title: "A Concepção",
      scripture: "Salmos 139:14-16",
      fullContent: "A jornada começa quando um óvulo é fertilizado. O zigoto já contém todo o plano de Deus para uma nova vida.\n\n**A Oração:** 'Pai amado, ajuda-me a depender de Ti em cada dia desta gestação. Amém.'"
    };
    if (week === 9) return {
      week: 9,
      title: "Crescimento Acelerado",
      scripture: "Salmos 71:6",
      fullContent: "Seu bebê pesa menos de 10 gramas, mas todas as partes do corpo já estão presentes. Agora ele começará a ganhar peso.\n\n**A Oração:** 'Paizinho, que os membros do meu bebê cresçam em saúde. Amém.'"
    };
    if (week === 21) return {
      week: 21,
      title: "Voz e Memória",
      scripture: "Salmos 71:6",
      fullContent: "O bebê já identifica a voz da mãe e do pai. Tudo o que você disser o bebê escuta.\n\n**Dica:** Aproveite para falar, cantar ou ler em voz alta para ele.\n\n**A Oração:** 'Senhor, que nosso bebê sinta segurança na nossa voz. Amém.'"
    };
    if (week === 40) return {
      week: 40,
      title: "O Nascimento",
      scripture: "Isaías 66:9",
      fullContent: "O ciclo se fecha para um novo começar. O bebê está pronto para o primeiro fôlego de vida.\n\n**A Oração:** 'Obrigada, Pai, por me transformar em mãe. Abençoa o momento do meu parto. Amém.'"
    };

    // Semanas preenchidas automaticamente para completar as 40
    const titulos = ["Desenvolvimento", "Nova Vida", "Proteção Divina", "Crescimento", "Formação", "Mãos do Oleiro"];
    const versiculos = ["Jeremias 1:5", "Salmos 127:3", "Gênesis 1:27", "Mateus 19:14"];
    
    return {
      week,
      title: titulos[week % titulos.length] + " " + week,
      scripture: versiculos[week % versiculos.length],
      fullContent: `Semana ${week}: O bebê continua se desenvolvendo maravilhosamente debaixo da proteção do Altíssimo. Cada célula está sendo colocada no lugar certo.\n\n**A Oração:** 'Senhor, abençoe o crescimento do meu filho nesta semana. Que ele seja forte e saudável. Amém.'`
    };
  })
];

export const diarioPessoalData: DiarioEntry[] = [];