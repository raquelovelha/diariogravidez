
import { WeekInfo } from './types';

export const SYSTEM_INSTRUCTION = `
Você é a Assistente Digital do "Diário da Minha Gravidez: Uma Nova História em Gestação", do movimento Desperta Débora.
Sua Missão: Acolher, orientar e interceder por gestantes, oferecendo suporte em três pilares: Espiritual (Oração), Emocional (Acolhimento) e Físico (Saúde Integral).

DIRETRIZES DE PERSONALIDADE:
- Tom de Voz: Pastoral, maternal, acolhedor, empático e encorajador. Você fala como uma "mãe Débora" experiente e carinhosa, com linguagem que reflete o carinho de uma mãe.
- Base Espiritual: Suas respostas devem ser fundamentadas em princípios bíblicos e no lema "Mães de joelhos, filhos de pé". Sempre que apropriado, sugira um pequeno motivo de oração para o bebê.
- Restrição Médica: NUNCA substitua um diagnóstico médico. SEMPRE use frases como "É importante conversar com seu obstetra sobre isso", "Consulte seu médico para um acompanhamento adequado" ou "Lembre-se que estas são dicas leves, e o acompanhamento médico é indispensável" ao falar de sintomas físicos, dores, exercícios, medicações ou qualquer questão de saúde. Não prescreva ou aconselhe tratamentos.
- Foco: Mantenha o foco no acolhimento cristão, gestação e intercessão. Não permita que o chat se desvie do tema.

CONHECIMENTO ESPECÍFICO - DIÁRIO DA MINHA GRAVIDEZ (Orações Semanais e Desenvolvimento):
Use estes dados para orações semanais e informações sobre o bebê. O Diário agora cobre todas as semanas de 1 a 40, com foco no desenvolvimento físico e espiritual.
- Semanas 1-3: Preparação, concepção e acolhimento.
- Semana 4: Oração pela formação física e ossos (Salmos 139:15). O bebê é tamanho de semente de papoula.
- Semana 5: Oração pelo coração do bebê (Salmos 51:10). Formação do coração, batimentos iniciam.
- Semana 8: Formação dos órgãos, rins. Oração para que o bebê filtre o que é bom (Jó 31:15).
- Semana 12: Rosto mudando, reflexos. Oração por crescimento em sabedoria e estatura (Lucas 2:52).
- Semana 16: Movimentos intensos. Oração para que ouça a voz de Deus (Salmos 116:2).
- Semana 20: Metade da gestação, sistema nervoso. Oração para escolhas corretas e inteligência (Salmos 141:2).
- Semana 24: Bebê viável, sente carícias. Oração pelos ossos e espírito (Ezequiel 37:5).
- Semana 26: Oração pelo equilíbrio na vida do bebê (Provérbios 11:1). Acumulação de gordura e proporções do corpo.
- Semana 28: Terceiro trimestre, abre olhos. Oração por equilíbrio e proteção (Jó 33:4).
- Semana 30: Oração pelo sistema imunológico (Salmos 121:7-8). Desenvolvimento de anticorpos e defesas naturais.
- Semana 32: Encaixando para nascer. Oração por proteção óssea e memórias (Salmos 34:20).
- Semana 35: Dicas práticas como a preparação das malas para a maternidade.
- Semana 36: Reta final. Oração pela integridade e futuro (Provérbios 20:7).
- Semana 40: Chegada. Oração de entrega e segurança (Salmos 22:9-10).
- (Consulte o JOURNEY_DATA para detalhes de todas as outras semanas).

SOBRE O PROPÓSITO E O MINISTÉRIO DESPERTA DÉBORA:
- Significado de ser "co-produtora" da história do bebê com Jesus: É reconhecer que a mãe é uma parceira de Deus na formação da vida e do caráter do filho, através da intercessão, cuidado e obediência à Sua vontade.
- Como surgiu o movimento Desperta Débora e qual a relação com os 15 minutos diários de oração: O movimento nasceu da inspiração divina para que mães de joelhos intercedessem diariamente por seus filhos por 15 minutos, crendo que a oração transforma gerações. O nome remete à profetisa Débora, que se levantou em um tempo de necessidade.
- Por que o diário sugere que o hábito de orar deve ser instituído por 38 semanas: Representa a duração média de uma gestação e visa solidificar o hábito da oração constante, transformando-o em um estilo de vida para a mãe.
- Quais são os principais alvos de oração das "Déboras" para a vida dos filhos: Salvação, caráter cristão, propósito divino, proteção física e espiritual, sabedoria e discernimento, relacionamentos piedosos e o temor do Senhor.

SAÚDE FÍSICA E BEM-ESTAR (Gestar em Movimento):
- 5 pilares de saúde na gestação: Alimentação saudável e balanceada, hidratação abundante, sono de qualidade, atividade física moderada (com autorização médica) e bem-estar emocional.
- Dicas de exercícios terapêuticos (conforme o trimestre informado e com reforço médico):
    - Caminhada leve: Benéfica para a circulação, disposição e bem-estar geral.
    - Alongamentos suaves: Ajudam a aliviar tensões musculares e melhorar a flexibilidade, especialmente na coluna.
    - Pilates e Yoga (adaptados para gestantes): Fortalecem o core, melhoram a postura, reduzem dores lombares e preparam o corpo para o parto, além de promover relaxamento e conexão com o bebê.
- Benefícios gerais dos exercícios: Redução de dores lombares e inchaço, melhora da postura, fortalecimento do assoalho pélvico, aumento da energia e fortalecimento do vínculo mãe-bebê.
- Lembrete: Sempre reforçar a importância de **conversar com o obstetra** antes de iniciar ou manter qualquer rotina de exercícios.

RELAÇÕES FAMILIARES E QUESTÕES EMOCIONAIS PROFUNDAS:
- Oração para o bebê não se tornar um "ídolo" no lugar do cônjuge: Pedir a Deus sabedoria para manter o equilíbrio no amor e nas prioridades, valorizando o relacionamento conjugal como a base e o alicerce da família, sem deixar que o foco exclusivo no bebê afaste o casal.
- Oração pelo envolvimento saudável dos familiares (avós, tios): Interceder para que a família estendida ofereça apoio amoroso, mas que também respeite a autonomia dos pais, evitando interferências desnecessárias ou pressões.
- Orações sugeridas para lidar com o medo (aborto, exames, etc.): Focar na fé, na confiança inabalável em Deus e na Sua soberania. Referências: Isaías 40:28-31 ("Os que esperam no Senhor renovarão as suas forças") e Salmos 127 ("Os filhos são herança do Senhor"). Oferecer palavras de esperança e uma breve oração escrita.
- Oração pela identidade e sexualidade (homem ou mulher) do bebê: Pedir que Deus forme seu filho com uma identidade sólida em Cristo, que ele se desenvolva em segurança e clareza sobre quem ele é em Deus, e que viva uma sexualidade pura e conforme os princípios divinos.

PREPARO PARA O PARTO E PUERPÉRIO (TRANSFORMAÇÃO):
- Pedidos específicos de oração para o dia do parto: Por uma equipe médica piedosa e competente, um ambiente hospitalar de paz, tranquilidade e força para a mãe, segurança para o bebê, livramento de complicações e uma experiência de parto que glorifique a Deus.
- Como o diário define o "baby blues" e qual a oração recomendada: "Baby blues" é um estado emocional comum pós-parto, caracterizado por variações de humor, choro fácil, irritabilidade e tristeza inexplicável, geralmente passageiro. A oração recomendada é por consolo divino, por paz que excede todo entendimento (Filipenses 4:6-7) e por força para superar essa fase.
- Abordagem sobre a renovação das forças da mãe e a importância do sono no pós-parto: Orar por descanso restaurador para o corpo e a alma da mãe, por sabedoria para organizar a rotina, aceitar ajuda e priorizar o sono, e por um corpo e mente fortalecidos pelo Espírito para cuidar do bebê.
- O que o material diz sobre o vínculo entre mãe e bebê através da amamentação: A amamentação é um momento sagrado de conexão profunda, nutrição física e emocional. O diário incentiva a orar por uma amamentação bem-sucedida, por paciência e por que este vínculo seja fortalecido a cada mamada.

Se a gestante expressar medo ou cansaço, responda com uma palavra de esperança e uma breve oração escrita, fundamentada nos Salmos 127 ou Isaías 40:28-31, sempre lembrando-a do cuidado de Deus.

// NOVAS SEÇÕES PARA MULHERES NÃO GESTANTES:
ACOLHIMENTO PARA MULHERES NÃO GESTANTES:
Você deve acolher com o mesmo carinho e sensibilidade as mulheres que não estão gestantes, adaptando a orientação conforme o tópico escolhido. Use o lema "Mães de joelhos, filhos de pé" para incentivar a intercessão, mesmo sem a maternidade biológica.

- **TENTANDO ENGRAVIDAR / DESEJO DE SER MÃE**:
  - Responda com esperança, encorajamento na fé e a certeza do cuidado de Deus.
  - Sugira oração pela provisão divina, pelo tempo certo de Deus e pelo milagre da vida. Mencione a história de Ana (1 Samuel 1 e 2) como exemplo de fé e perseverança na oração.
  - Ofereça uma breve oração escrita focada na confiança em Deus e no cumprimento de Sua vontade.
  - Exemplo de oração: "Querido Pai, apresento diante de Ti o desejo ardente de Tua filha de ser mãe. Que a Sua vontade perfeita se cumpra em sua vida, e que ela encontre paz e esperança em Ti enquanto espera. Que o milagre da vida se manifeste no tempo certo. Em nome de Jesus, amém."

- **PERDA GESTACIONAL / LUTO MATERNO**:
  - Responda com profunda empatia, acolhimento da dor e validação dos sentimentos.
  - Ofereça consolo bíblico e a certeza do amor de Deus que conforta em todas as aflições.
  - Sugira oração por cura emocional, paz que excede todo entendimento e a renovação da esperança.
  - Referências: Salmos 34:18 ("O Senhor está perto dos que têm o coração quebrantado") e Mateus 5:4 ("Bem-aventurados os que choram, pois serão consolados").
  - Ofereça uma breve oração escrita focada em cura e consolo.
  - Exemplo de oração: "Amado Jesus, abraça Tua filha com Teu consolo divino neste momento de dor e luto. Cura as feridas de seu coração e renova sua esperança. Que a paz que vem de Ti preencha todo o vazio. Conforta-a com a certeza do Teu amor inabalável. Em nome de Jesus, amém."

- **OPTOU POR NÃO TER FILHOS / NÃO SER MÃE BIOLÓGICA**:
  - Acolha e respeite a escolha, reforçando que o papel de "Mãe Débora" vai além da maternidade biológica.
  - Enfatize a importância da intercessão por outros filhos (da família, da igreja, do movimento), crianças e adolescentes que precisam de cobertura espiritual.
  - Incentive a participação no movimento Desperta Débora através da oração e do apoio, destacando que sua intercessão é poderosa e valorizada por Deus.
  - Exemplo de resposta: "Querida irmã, sua decisão é respeitada e valorizada por Deus e por nós. Ser uma 'Mãe Débora' é um chamado de intercessão que transcende a maternidade biológica. Sua oração é poderosa para transformar a vida de tantos filhos espirituais ao nosso redor, crianças e adolescentes que precisam de cobertura e cuidado. Conte comigo para orar por você e para que Deus te direcione em como abençoar vidas com sua intercessão e amor."

- **PLANO DE ORAÇÃO PARA MULHERES QUE DESEJAM SER MÃES**:
  - Explique que é um programa de apoio e intercessão dedicado a mulheres que sonham em engravidar, oferecendo um espaço de fé, encorajamento e orações específicas.
  - Mencione que o plano se alinha com os princípios do movimento Desperta Débora, crendo no poder da oração para o milagre da vida.
  - Encoraje a buscar mais informações sobre como participar deste plano, mencionando que a inscrição pode ser feita no site do Desperta Débora ou nas plataformas de comunicação do movimento (apenas se esta informação for real e acessível).
  - Exemplo de resposta: "Querida, o 'Plano de Oração para mulheres que desejam ser mães' é um programa especial do movimento Desperta Débora, dedicado a apoiar e interceder por aquelas que sonham em engravidar. Oferecemos motivos de oração específicos, meditações bíblicas e um ambiente de acolhimento e fé. Cremos que Deus ouve a oração das mães de joelhos, mesmo antes da concepção. Convido você a buscar mais informações sobre como participar e se unir a nós neste propósito abençoador!"

- **FALE COM UMA DÉBORA LOCAL / CONEXÃO COM A COMUNIDADE**:
  - Se a usuária expressar desejo de encontrar uma "Mãe Débora" local, buscar um grupo de oração, ou se conectar com a comunidade do Desperta Débora em sua região, responda com carinho e forneça o link direto para os contatos das líderes estaduais.
  - Explique que através deste link ela pode encontrar a líder mais próxima para acolhimento, participação nos encontros mensais e para vivenciar a irmandade do movimento.
  - Link: https://www.despertadebora.com.br/onde-estamos/
  - Exemplo de resposta: "Que bênção, querida! Entendo perfeitamente o desejo de ter uma conexão mais próxima e de compartilhar essa jornada com outras Mães Déboras. Para encontrar uma líder do movimento Desperta Débora mais perto de você, e se juntar aos nossos encontros mensais, acesse este link com os contatos das líderes estaduais: [https://www.despertadebora.com.br/onde-estamos/](https://www.despertadebora.com.br/onde-estamos/). Tenho certeza de que você será muito bem acolhida e encontrará um apoio precioso!"

- **CONVITE PARA SE TORNAR UMA DÉBORA CADASTRADA**:
  - Sempre que possível e natural na conversa, convide a usuária a se tornar uma Débora cadastrada oficialmente.
  - Explique que ao se cadastrar, ela se torna parte de uma rede de intercessoras de uma "geração compromisso" e se conecta com milhares de outras mães que oram.
  - Link de cadastro: https://mpc.transforme.tech/captura/voluntario/cadastrodeboras
  - Exemplo de convite: "Querida, você já pensou em se tornar uma Débora cadastrada oficialmente? Ao se cadastrar, você se une a milhares de mães intercessoras de uma 'geração compromisso', fortalecendo nossa rede de oração e se conectando com outras mães. Seria uma alegria ter você conosco! Você pode se cadastrar aqui: [https://mpc.transforme.tech/captura/voluntario/cadastrodeboras](https://mpc.transforme.tech/captura/voluntario/cadastrodeboras)"
`;

export const JOURNEY_DATA: WeekInfo[] = [
  {
    week: 1,
    title: 'Preparação e Propósito',
    scripture: 'Jeremias 1:5',
    prayerFocus: 'Oração pela preparação do ventre e do coração',
    description: 'O início de uma jornada divina.',
    fullContent: `Nesta **1ª semana**, mesmo que a concepção ainda não tenha ocorrido, Deus já conhece o plano para sua vida. É um tempo de preparar o corpo e o espírito. Que sua oração seja de entrega, baseada em **Jeremias 1:5**: *'Antes que te formasse no ventre te conheci, e antes que saísses da madre, te santifiquei.'* Peça a Deus que prepare seu coração para a missão da maternidade.`
  },
  {
    week: 2,
    title: 'O Milagre da Concepção',
    scripture: 'Salmos 139:13',
    prayerFocus: 'Oração pelo encontro da vida',
    description: 'O momento em que a vida começa.',
    fullContent: `Na **2ª semana**, o milagre da vida acontece no oculto. Deus começa a tecer uma nova história. Ore agradecendo pelo dom da vida e pela soberania de Deus, como diz o **Salmos 139:13**: *'Pois possuíste os meus rins; cobriste-me no ventre de minha mãe.'* Peça que a presença do Senhor envolva este novo ser desde o primeiro instante.`
  },
  {
    week: 3,
    title: 'Acolhimento no Ventre',
    scripture: 'Gênesis 1:27',
    prayerFocus: 'Oração pela implantação e identidade',
    description: 'O bebê encontra seu lugar de proteção.',
    fullContent: `Na **3ª semana**, a pequena vida se estabelece em seu ventre. É o início da formação de alguém criado à imagem de Deus. Ore para que o bebê se sinta acolhido e seguro, lembrando de **Gênesis 1:27**: *'E criou Deus o homem à sua imagem.'* Peça que a identidade de filho(a) de Deus seja selada nele desde agora.`
  },
  {
    week: 4,
    title: 'Formação física e ossos',
    scripture: 'Salmos 139:15',
    prayerFocus: 'Oração pela formação física e ossos',
    description: 'O bebê é tamanho de semente de papoula.',
    fullContent: `Nesta **4ª semana**, seu milagre é do tamanho de uma **semente de papoula**. Seus ossos estão começando a se formar, e cada detalhe é desenhado pelas mãos do Criador. Que sua oração hoje seja por essa formação perfeita, crendo no que diz **Salmos 139:15**: *'Os meus ossos não te foram encobertos, quando no oculto fui formado, e entretecido nas profundezas da terra.'* Ore pela saúde e integridade de cada ossinho do seu bebê, para que Deus o fortaleça desde o ventre.`
  },
  {
    week: 5,
    title: 'Formação do coração',
    scripture: 'Salmos 51:10',
    prayerFocus: 'Oração pelo coração do bebê',
    description: 'Formação do coração, batimentos iniciam.',
    fullContent: `Na **5ª semana**, uma melodia divina começa a ecoar: o coraçãozinho do seu bebê inicia seus primeiros batimentos! Este pequeno órgão vital está se formando, um símbolo do amor de Deus. Que sua oração seja, como em **Salmos 51:10**, para que Deus crie um coração puro no seu filho: *'Cria em mim, ó Deus, um coração puro e renova em mim um espírito reto.'* Peça para que o coração do seu bebê bata sempre em sintonia com o coração de Deus, crescendo em amor e vitalidade.`
  },
  {
    week: 6,
    title: 'O Sopro da Vida',
    scripture: 'Salmos 139:16',
    prayerFocus: 'Oração pelo sistema nervoso e proteção',
    description: 'O tubo neural se fecha.',
    fullContent: `Na **6ª semana**, o sistema nervoso central está se desenvolvendo. Deus está escrevendo os dias deste bebê em Seu livro. Ore por proteção sobre o desenvolvimento cerebral, baseada em **Salmos 139:16**: *'Os teu olhos viram o meu corpo ainda informe; e no teu livro todas estas coisas foram escritas.'* Peça que a mente do seu filho seja guardada pelo Senhor.`
  },
  {
    week: 7,
    title: 'Mãos e Pés para Servir',
    scripture: 'Isaías 49:16',
    prayerFocus: 'Oração pelos membros e direção',
    description: 'Pequenos brotos de braços e pernas aparecem.',
    fullContent: `Na **7ª semana**, começam a surgir os brotos que serão as mãos e os pés. Deus já gravou seu bebê nas palmas de Suas mãos. Ore para que esses pés caminhem em retidão e essas mãos sirvam ao Senhor, como em **Isaías 49:16**: *'Eis que nas palmas das minhas mãos te gravei.'* Peça direção divina para cada passo futuro.`
  },
  {
    week: 8,
    title: 'Formação dos órgãos (rins)',
    scripture: 'Jó 31:15',
    prayerFocus: 'Oração para que o bebê filtre o que é bom',
    description: 'Formação dos órgãos, rins.',
    fullContent: `Chegamos à **8ª semana**, e os órgãos internos do seu bebê, incluindo os rins, estão em plena formação. Eles terão um papel crucial em filtrar o que é bom e essencial. Que sua oração neste momento seja para que Deus capacite seu filho a *filtrar o que é bom* na vida, a discernir o certo do errado, conforme a sabedoria de **Jó 31:15**: *'Aquele que me fez no ventre, não o fez também a ele? Ou não nos formou um só na madre?'* Interceda para que seu bebê tenha um coração puro e uma mente discernidora.`
  },
  {
    week: 9,
    title: 'Movimento e Vida',
    scripture: 'Atos 17:28',
    prayerFocus: 'Oração pela vitalidade e energia',
    description: 'O bebê começa a fazer movimentos suaves.',
    fullContent: `Na **9ª semana**, seu bebê começa a se mover, embora você ainda não sinta. É a vida pulsando em plenitude. Ore pela vitalidade do seu filho, reconhecendo que em Deus vivemos e nos movemos, como diz **Atos 17:28**: *'Porque nele vivemos, e nos movemos, e existimos.'* Peça que a energia do Espírito Santo sustente cada movimento desse pequeno ser.`
  },
  {
    week: 10,
    title: 'Templo do Espírito',
    scripture: '1 Coríntios 6:19',
    prayerFocus: 'Oração pela saúde dos órgãos vitais',
    description: 'Os órgãos vitais começam a funcionar.',
    fullContent: `Na **10ª semana**, os órgãos vitais já estão funcionando. O corpo do seu bebê está se tornando um templo. Ore para que ele cresça com saúde e consciência de que seu corpo pertence ao Senhor, conforme **1 Coríntios 6:19**: *'Ou não sabeis que o vosso corpo é o templo do Espírito Santo?'* Peça que cada órgão funcione em perfeita harmonia divina.`
  },
  {
    week: 11,
    title: 'Semelhança Divina',
    scripture: 'Gênesis 1:26',
    prayerFocus: 'Oração pela aparência e caráter',
    description: 'O bebê já tem uma aparência distintamente humana.',
    fullContent: `Na **11ª semana**, as características humanas estão bem definidas. Seu bebê reflete a criatividade de Deus. Ore para que, além da aparência física, ele reflita o caráter de Cristo, baseada em **Gênesis 1:26**: *'Façamos o homem à nossa imagem, conforme a nossa semelhança.'* Peça que a beleza do Senhor esteja sobre a vida dele.`
  },
  {
    week: 12,
    title: 'Crescimento em sabedoria e estatura',
    scripture: 'Lucas 2:52',
    prayerFocus: 'Oração por crescimento em sabedoria e estatura',
    description: 'Rosto mudando, reflexos.',
    fullContent: `A **12ª semana** é marcada por transformações visíveis no rosto do seu bebê e pelo desenvolvimento de seus primeiros reflexos. É um período de rápido crescimento e aprendizado intrauterino. Que sua oração seja por um crescimento em sabedoria e estatura, tanto física quanto espiritual, inspirada em **Lucas 2:52**: *'E crescia Jesus em sabedoria, e em estatura, e em graça para com Deus e os homens.'* Peça que seu filho desenvolva um rosto que expresse a glória de Deus e reflexos que o guiem para o bem.`
  },
  {
    week: 13,
    title: 'Nova Fase, Nova Esperança',
    scripture: 'Eclesiastes 3:1',
    prayerFocus: 'Oração pela transição para o segundo trimestre',
    description: 'Início do segundo trimestre.',
    fullContent: `Na **13ª semana**, você entra no segundo trimestre! É um novo tempo de esperança e menos desconfortos. Ore agradecendo por cada fase, confiando em **Eclesiastes 3:1**: *'Tudo tem o seu tempo determinado, e há tempo para todo o propósito debaixo do céu.'* Peça que este novo ciclo seja repleto de paz e renovação das suas forças.`
  },
  {
    week: 14,
    title: 'Identidade Única',
    scripture: 'Isaías 43:1',
    prayerFocus: 'Oração pelas digitais e propósito único',
    description: 'As impressões digitais estão se formando.',
    fullContent: `Na **14ª semana**, as impressões digitais do seu bebê estão se definindo. Ele é único no universo. Ore para que ele entenda seu valor e chamado exclusivo em Deus, como diz **Isaías 43:1**: *'Não temas, porque eu te remi; chamei-te pelo teu nome, tu és meu.'* Peça que ele nunca duvide do amor e do propósito que o Senhor tem para ele.`
  },
  {
    week: 15,
    title: 'Ouvindo a Palavra',
    scripture: 'Romanos 10:17',
    prayerFocus: 'Oração pela audição e fé',
    description: 'O bebê começa a ouvir sons externos.',
    fullContent: `Na **15ª semana**, seu bebê começa a ouvir! Ele já pode escutar sua voz e os sons ao redor. Ore para que seus ouvidos sejam sensíveis à verdade, lembrando que a fé vem pelo ouvir, conforme **Romanos 10:17**: *'De sorte que a fé é pelo ouvir, e o ouvir pela palavra de Deus.'* Cante louvores e fale da Palavra para ele desde agora.`
  },
  {
    week: 16,
    title: 'Ouvindo a voz de Deus',
    scripture: 'Salmos 116:2',
    prayerFocus: 'Oração para que ouça a voz de Deus',
    description: 'Movimentos intensos.',
    fullContent: `Na **16ª semana**, os movimentos do seu bebê se tornam mais intensos e perceptíveis, um lembrete vivo de sua presença. Ele está aprendendo a se mover e a interagir com o mundo dentro de você. Que sua oração seja para que seu bebê *ouça a voz de Deus* desde cedo, atento aos Seus sussurros, conforme **Salmos 116:2**: *'Inclinou para mim os seus ouvidos; portanto, o invocarei enquanto eu viver.'* Que esses movimentos sejam um ensaio para uma vida de dança com o Espírito Santo.`
  },
  {
    week: 17,
    title: 'Sustento e Provisão',
    scripture: 'Deuteronômio 8:3',
    prayerFocus: 'Oração pelo acúmulo de gordura e nutrição',
    description: 'O bebê começa a acumular gordura para energia.',
    fullContent: `Na **17ª semana**, o bebê começa a ganhar camadas de gordura para se manter aquecido e ter energia. Ore pela nutrição perfeita e pelo sustento que vem de Deus, lembrando de **Deuteronômio 8:3**: *'Nem só de pão viverá o homem, mas de tudo o que sai da boca do Senhor.'* Peça que seu filho seja nutrido física e espiritualmente pela bondade do Pai.`
  },
  {
    week: 18,
    title: 'Provando a Bondade',
    scripture: 'Salmos 34:8',
    prayerFocus: 'Oração pelo paladar e satisfação em Deus',
    description: 'O bebê começa a engolir o líquido amniótico.',
    fullContent: `Na **18ª semana**, seu bebê está praticando a deglutição. Ele começa a "provar" o mundo ao seu redor. Ore para que ele tenha sede de Deus e prove de Sua doçura, como em **Salmos 34:8**: *'Provai, e vede que o Senhor é bom; bem-aventurado o homem que nele confia.'* Peça que ele encontre satisfação plena somente no Senhor.`
  },
  {
    week: 19,
    title: 'Proteção e Cobertura',
    scripture: 'Salmos 91:4',
    prayerFocus: 'Oração pela pele e proteção divina',
    description: 'A pele do bebê é coberta pelo vernix.',
    fullContent: `Na **19ª semana**, uma camada protetora chamada vernix cobre a pele sensível do bebê. Ore pedindo a cobertura espiritual de Deus sobre a vida dele, baseada no **Salmos 91:4**: *'Ele te cobrirá com as suas penas, e debaixo das suas asas te confiarás.'* Peça que seu filho viva sempre sob a proteção do Altíssimo, guardado de todo mal.`
  },
  {
    week: 20,
    title: 'Escolhas corretas e inteligência',
    scripture: 'Salmos 141:2',
    prayerFocus: 'Oração para escolhas corretas e inteligência',
    description: 'Metade da gestação, sistema nervoso.',
    fullContent: `Chegamos à **20ª semana**, a metade da gestação! O sistema nervoso do seu bebê está se desenvolvendo rapidamente, o que impactará suas escolhas futuras. Que sua oração seja por *escolhas corretas e inteligência* divinamente inspirada, para que ele encontre prazer na lei do Senhor, como em **Salmos 141:2**: *'Suba a minha oração perante a tua face como incenso, e o levantar das minhas mãos como o sacrifício da tarde.'* Peça por um intelecto abençoado e um coração guiado pela Palavra.`
  },
  {
    week: 21,
    title: 'Palavras de Doçura',
    scripture: 'Salmos 119:103',
    prayerFocus: 'Oração pelas papilas gustativas e fala',
    description: 'As papilas gustativas estão formadas.',
    fullContent: `Na **21ª semana**, seu bebê já pode sentir sabores! Ore para que as palavras que saírem de sua boca no futuro sejam doces e tragam vida, conforme o **Salmos 119:103**: *'Quão doces são as tuas palavras ao meu paladar, mais do que o mel à minha boca!'* Peça que ele tenha prazer na verdade e que sua fala seja sempre temperada com graça.`
  },
  {
    week: 22,
    title: 'Olhos Fixos no Bem',
    scripture: 'Provérbios 4:25',
    prayerFocus: 'Oração pela visão e foco espiritual',
    description: 'Pálpebras e sobrancelhas estão bem visíveis.',
    fullContent: `Na **22ª semana**, os olhos do bebê estão formados, embora ainda fechados. Ore para que ele tenha uma visão espiritual clara e foco no que é eterno, como diz **Provérbios 4:25**: *'Os teus olhos olhem para a frente, e as tuas pálpebras olhem direto diante de ti.'* Peça que ele nunca se desvie do caminho que o Senhor preparou.`
  },
  {
    week: 23,
    title: 'Fôlego de Vida',
    scripture: 'Jó 33:4',
    prayerFocus: 'Oração pelos pulmões e vida abundante',
    description: 'Os pulmões estão se preparando para respirar.',
    fullContent: `Na **23ª semana**, os pulmões iniciam treinos importantes para a respiração. Ore para que o fôlego de Deus sustente seu filho em todos os momentos, crendo em **Jó 33:4**: *'O Espírito de Deus me fez; e o sopro do Todo-Poderoso me dá vida.'* Peça que ele respire a paz do Senhor e viva uma vida abundante em Sua presença.`
  },
  {
    week: 24,
    title: 'Ossos e espírito',
    scripture: 'Ezequiel 37:5',
    prayerFocus: 'Oração pelos ossos e espírito',
    description: 'Bebê viável, sente carícias.',
    fullContent: `A **24ª semana** é um marco importante: seu bebê agora é considerado *viável* e começa a sentir suas carícias e o seu amor. A cada toque e voz, ele se conecta com você. Que sua oração seja pelos seus *ossos e espírito*, para que Deus sopre vida em cada parte do seu ser, como em **Ezequiel 37:5**: *'Assim diz o Senhor DEUS a estes ossos: Eis que farei entrar em vós o espírito, e vivereis.'* Peça que seu filho seja um vaso de honra, cheio do Espírito Santo.`
  },
  {
    week: 25,
    title: 'Contado por Deus',
    scripture: 'Mateus 10:30',
    prayerFocus: 'Oração pelo crescimento do cabelo e cuidado divino',
    description: 'O cabelo começa a crescer.',
    fullContent: `Na **25ª semana**, o cabelo do seu bebê começa a crescer. Deus cuida de cada detalhe, até dos fios de cabelo. Ore sentindo o cuidado minucioso do Pai, lembrando de **Mateus 10:30**: *'E até mesmo os cabelos da vossa cabeça estão todos contados.'* Peça que seu filho cresça sabendo que é amado e cuidado em cada pequeno detalhe de sua vida.`
  },
  {
    week: 26,
    title: 'Equilíbrio na vida do bebê',
    scripture: 'Provérbios 11:1',
    prayerFocus: 'Oração pelo equilíbrio na vida do bebê',
    description: 'Acumulação de gordura e proporções do corpo.',
    fullContent: `Na **26ª semana**, seu bebê está acumulando gordura e suas proporções corporais estão se harmonizando. É um tempo de crescimento e equilíbrio. Que sua oração seja pelo *equilíbrio na vida do bebê*, para que ele cresça com sabedoria, graça e proporção em todas as áreas, conforme **Provérbios 11:1**: *'Balança enganosa é abominação para o Senhor, mas o peso justo é o seu prazer.'* Interceda por uma vida plena e equilibrada em Cristo.`
  },
  {
    week: 27,
    title: 'Sonhos de Deus',
    scripture: 'Joel 2:28',
    prayerFocus: 'Oração pelo sono e sonhos proféticos',
    description: 'O bebê começa a ter ciclos de sono e vigília.',
    fullContent: `Na **27ª semana**, seu bebê já tem ciclos de sono e pode até sonhar! Ore para que o descanso dele seja tranquilo e que ele tenha os sonhos de Deus para sua vida, como em **Joel 2:28**: *'E há de ser que... os vossos jovens terão visões, e os vossos velhos sonharão sonhos.'* Peça que desde o ventre ele seja um sonhador do Reino.`
  },
  {
    week: 28,
    title: 'Equilíbrio e proteção',
    scripture: 'Jó 33:4',
    prayerFocus: 'Oração por equilíbrio e proteção',
    description: 'Terceiro trimestre, abre olhos.',
    fullContent: `Entramos no **terceiro trimestre** na **28ª semana**! Os olhos do seu bebê já se abrem, e ele começa a perceber a luz e as sombras. É um tempo de despertar sensorial. Que sua oração seja por *equilíbrio e proteção* para ele, crendo que o Espírito de Deus o criou e lhe dá vida, como em **Jó 33:4**: *'O Espírito de Deus me fez, e o sopro do Todo-Poderoso me dá vida.'* Peça que seus olhos espirituais também se abram para a verdade divina, e que ele seja protegido em todos os seus caminhos.`
  },
  {
    week: 29,
    title: 'Mente Renovada',
    scripture: 'Romanos 12:2',
    prayerFocus: 'Oração pelo desenvolvimento cerebral e sabedoria',
    description: 'O cérebro está crescendo e se tornando mais complexo.',
    fullContent: `Na **29ª semana**, o cérebro do seu bebê está em franco desenvolvimento. Ore para que ele tenha uma mente brilhante e voltada para o Senhor, conforme **Romanos 12:2**: *'E não vos conformeis com este mundo, mas transformai-vos pela renovação da vossa mente.'* Peça que ele cresça em sabedoria e discernimento, não se moldando aos padrões deste mundo.`
  },
  {
    week: 30,
    title: 'Sistema imunológico',
    scripture: 'Salmos 121:7-8',
    prayerFocus: 'Oração pelo sistema imunológico',
    description: 'Desenvolvimento de anticorpos e defesas naturais.',
    fullContent: `Na **30ª semana**, o sistema imunológico do seu bebê está se desenvolvendo, preparando-o com anticorpos e defesas naturais para o mundo exterior. Que sua oração seja pelo seu *sistema imunológico*, para que Deus o guarde de todo mal e doença, conforme **Salmos 121:7-8**: *'O Senhor te guardará de todo o mal; ele guardará a tua alma. O Senhor guardará a tua saída e a tua entrada, desde agora e para sempre.'* Declare saúde e proteção sobre a vida do seu filho.`
  },
  {
    week: 31,
    title: 'Calor do Amor',
    scripture: 'Cantares 2:11-12',
    prayerFocus: 'Oração pela regulação térmica e conforto',
    description: 'O bebê já consegue regular sua própria temperatura.',
    fullContent: `Na **31ª semana**, seu bebê já consegue regular sua temperatura corporal. Ore para que ele viva sempre aquecido pelo amor de Deus e da família, lembrando de **Cantares 2:11-12**: *'Porque eis que passou o inverno; a chuva cessou, e se foi... o tempo de cantar chega.'* Peça que a vida dele seja uma eterna primavera na presença do Senhor.`
  },
  {
    week: 32,
    title: 'Proteção óssea e memórias',
    scripture: 'Salmos 34:20',
    prayerFocus: 'Oração por proteção óssea e memórias',
    description: 'Encaixando para nascer.',
    fullContent: `Na **32ª semana**, seu bebê começa a se *encaixar* para o nascimento, assumindo a posição ideal para a chegada. É um período de preparação e antecipação. Que sua oração seja por *proteção óssea e memórias* abençoadas, para que Deus guarde cada parte do seu corpo e encha sua mente com boas lembranças, como em **Salmos 34:20**: *'Ele guarda todos os seus ossos; nem sequer um deles se quebra.'* Peça por um parto tranquilo e um futuro repleto de memórias felizes em Deus.`
  },
  {
    week: 33,
    title: 'Guarda do Senhor',
    scripture: 'Salmos 121:7',
    prayerFocus: 'Oração pelo sistema imunológico final',
    description: 'O sistema imunológico continua a se fortalecer.',
    fullContent: `Na **33ª semana**, as defesas do bebê estão quase prontas. Ore reforçando a proteção divina sobre a saúde dele, baseada em **Salmos 121:7**: *'O Senhor te guardará de todo o mal; ele guardará a tua alma.'* Peça que nenhuma enfermidade encontre lugar na vida do seu filho e que ele cresça forte e saudável.`
  },
  {
    week: 34,
    title: 'Fôlego Preparado',
    scripture: 'Ezequiel 37:9',
    prayerFocus: 'Oração pela maturidade pulmonar',
    description: 'Os pulmões estão quase totalmente maduros.',
    fullContent: `Na **34ª semana**, os pulmões estão finalizando sua maturação. Ore para que o Espírito de Deus sopre vida plena sobre ele, como em **Ezequiel 37:9**: *'Vem dos quatro ventos, ó fôlego, e assopra sobre estes mortos, para que vivam.'* Peça que o primeiro choro seja um grito de vitória e saúde ao nascer.`
  },
  {
    week: 35,
    title: 'Preparação para a maternidade',
    scripture: 'Filipenses 4:6-7',
    prayerFocus: 'Oração pela preparação e tranquilidade na espera da maternidade',
    description: 'Dicas práticas como a preparação das malas para a maternidade.',
    fullContent: `Chegamos à **35ª semana**, um tempo de *preparação prática* para a maternidade, como organizar as malas para a maternidade. Mas, acima de tudo, é um tempo de preparar o coração. Que sua oração seja pela *preparação e tranquilidade na espera da maternidade*, depositando todas as suas ansiedades em Deus, conforme **Filipenses 4:6-7**: *'Não andeis ansiosos por coisa alguma; antes em tudo sejam os vossos pedidos conhecidos diante de Deus pela oração e súplica com ações de graças; e a paz de Deus, que excede todo o entendimento, guardará os vossos corações e os vossos sentimentos em Cristo Jesus.'* Entregue a Ele cada detalhe.`
  },
  {
    week: 36,
    title: 'Integridade e futuro',
    scripture: 'Provérbios 20:7',
    prayerFocus: 'Oração pela integridade e futuro',
    description: 'Reta final.',
    fullContent: `Na **36ª semana**, você está na *reta final* da gestação! A expectativa é grande, e o coração transborda. Que sua oração seja pela *integridade e futuro* do seu bebê, para que ele cresça em retidão e seja um exemplo de conduta, conforme **Provérbios 20:7**: *'O justo anda na sua integridade; bem-aventurados serão os seus filhos depois dele.'* Peça que Deus direcione cada passo do seu filho e o molde para cumprir o propósito divino.`
  },
  {
    week: 37,
    title: 'Combate Vencido',
    scripture: '2 Timóteo 4:7',
    prayerFocus: 'Oração pela conclusão da gestação',
    description: 'O bebê é considerado a termo.',
    fullContent: `Na **37ª semana**, seu bebê está pronto! A jornada da gestação está quase completa. Ore com gratidão por ter chegado até aqui, como diz **2 Timóteo 4:7**: *'Combati o bom combate, acabei a carreira, guardei a fé.'* Peça que a mesma fé te sustente no momento do parto e em toda a criação do seu filho.`
  },
  {
    week: 38,
    title: 'Esperança no Senhor',
    scripture: 'Lamentações 3:25',
    prayerFocus: 'Oração pela paciência e tempo de Deus',
    description: 'Aguardando o momento certo.',
    fullContent: `Na **38ª semana**, a espera pode trazer ansiedade. Ore pedindo paciência e confiança no tempo perfeito de Deus, baseada em **Lamentações 3:25**: *'Bom é o Senhor para os que esperam por ele, para a alma que o busca.'* Peça que a paz do Senhor guarde seu coração enquanto você aguarda o grande encontro.`
  },
  {
    week: 39,
    title: 'Força para o Encontro',
    scripture: 'Salmos 27:14',
    prayerFocus: 'Oração pela força física e emocional para o parto',
    description: 'Preparação final para o parto.',
    fullContent: `Na **39ª semana**, o corpo e a mente se preparam para o esforço do parto. Ore pedindo força e coragem, confiando no **Salmos 27:14**: *'Espera no Senhor, anima-te, e ele fortalecerá o teu coração.'* Peça que o Senhor seja sua rocha e sua força, guiando cada contração e cada momento até o nascimento.`
  },
  {
    week: 40,
    title: 'Chegada e entrega',
    scripture: 'Salmos 22:9-10',
    prayerFocus: 'Oração de entrega e segurança',
    description: 'Chegada.',
    fullContent: `Eis que a **40ª semana** chegou! O grande dia da *chegada* do seu milagre pode ser a qualquer momento. É um tempo de *entrega e segurança* total nas mãos de Deus. Que sua oração seja, como em **Salmos 22:9-10**: *'Tu és aquele que me tirou do ventre; tu me fizeste confiar quando estava aos seios de minha mãe. Sobre ti fui lançado desde a madre; tu és o meu Deus desde o ventre de minha mãe.'* Entregue seu bebê ao Senhor, crendo em Sua fidelidade e proteção inabalável para o parto e para toda a vida.`
  },
];
