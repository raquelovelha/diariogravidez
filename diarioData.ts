// Interface para o Guia Semanal (Conteúdo do PDF)
export interface WeekInfo {
  week: number | string;
  title: string;
  scripture: string;
  fullContent: string;
}

// Dados reais extraídos do PDF para a JourneyScreen
export const JOURNEY_DATA: WeekInfo[] = [
  {
    week: "Início",
    title: "Planejando ser Mãe",
    scripture: "Isaías 54:13",
    fullContent: "> 'Todos os seus filhos serão ensinados pelo Senhor, e grande será a paz de suas crianças.' (Isaías 54:13)\n\nAntes mesmo da concepção, o coração já começa a gestar o desejo da maternidade. É um tempo de sondar as motivações.\n\n**A Oração:** 'Pai querido, coloca em meu coração a motivação correta para o meu desejo de ser mãe. Não quero engravidar para agradar a ninguém, nem para tentar melhorar meu casamento. Lembra-me que só em Jesus eu posso me sentir completa. Que meu coração sempre se lembre de que, antes de ser o meu bebê, ele é o Teu bebê amado! Amém.'"
  },
  {
    week: 1,
    title: "A Concepção",
    scripture: "Salmos 139:14-16",
    fullContent: "> 'Eu te louvo porque me fizeste de modo especial e admirável. Tuas obras são maravilhosas! Disso tenho plena certeza.' (Salmos 139:14)\n\nA incrível jornada começa quando um óvulo é fertilizado. O zigoto, embora minúsculo, já contém todo o plano de Deus para uma nova vida.\n\n**A Oração:** 'Pai amado, a notícia de que estou gerando uma vida me faz feliz. Ajuda-me a depender de Ti em cada dia desta gestação. Que eu me sinta segura de que Tu estás tecendo o meu bebê no meu ventre e que ele será uma pessoa à Tua imagem e semelhança. Amém.'"
  },
  {
    week: 9,
    title: "Crescimento Acelerado",
    scripture: "Salmos 71:6",
    fullContent: "> 'Desde o ventre materno dependo de ti; tu me sustentaste desde as entranhas de minha mãe.' (Salmos 71:6)\n\nSeu bebê pesa menos de 10 gramas, mas todas as partes do corpo já estão presentes. Agora ele começará a ganhar peso de forma incrível.\n\n**A Oração:** 'Paizinho, que os membros do meu bebê cresçam em saúde. Que ele cresça andando firme em Teus caminhos. Que ele veja que eu Te amo mais que tudo e queira experimentar este Teu amor também. Amém.'"
  },
  {
    week: 40,
    title: "O Nascimento",
    scripture: "Isaías 66:9",
    fullContent: "> 'Acaso faço chegar a hora do parto e não faço nascer?\", diz o Senhor.' (Isaías 66:9)\n\nO ciclo se fecha para um novo começar. O bebê está pronto para o primeiro fôlego de vida fora do ventre.\n\n**A Oração:** 'Obrigada, Pai, por me transformar em mãe. Abençoa o momento do meu parto dando paz e confiança. Que este bebê honre o Teu nome e todos nos vejam como uma família bem-aventurada. Amém.'"
  }
];

// Interface para os Registros Pessoais da Usuária (O que você mandou por último)
export interface DiarioEntry {
  id: string;
  data: string;
  titulo: string;
  conteudo: string;
  humor: 'feliz' | 'neutro' | 'triste' | 'produtivo' | 'cansado';
  tags: string[];
}

// Este array você usa na tela de "Meu Diário"
export const diarioPessoalData: DiarioEntry[] = [
  {
    id: '1',
    data: '2026-04-01',
    titulo: 'Reflexão do dia',
    conteudo: 'Senti o bebê mexer hoje pela primeira vez! Uma sensação inexplicável.',
    humor: 'feliz',
    tags: ['bebê', 'emoção'],
  }
];