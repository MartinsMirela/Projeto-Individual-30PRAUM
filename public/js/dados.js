// =====================================================
// DADOS (vetores)
// =====================================================
const ROTAS = [
  { id: "inicio",   nome: "Início" },
  { id: "artistas", nome: "Artistas" },
  { id: "playlist", nome: "Playlist" },
  { id: "quiz",     nome: "Quiz" },
  { id: "memoria", nome: "Memória" },
  { id: "login",    nome: "Login" },
  { id: "cadastro", nome: "Cadastro" }
];

const ARTISTAS = [
  {
    nome: "Matuê",
    tipo: "Fundador",
    foto: "img/matue.jpg",
    desc: "Matuê (Matheus Brasileiro Aguiar) nasceu em 11 de outubro de 1993, em Fortaleza (CE). Aos oito anos, mudou-se com a família para Oakland, na Califórnia, onde teve contato com o hip-hop e o rap americano. De volta ao Brasil, desenvolveu sua identidade artística, ligada às raízes nordestinas. Construiu carreira no trap e fundou a 30PRAUM com Clara Mendes, levando o nome de Fortaleza para todo o país."
  },
  {
    nome: "Teto",
    tipo: "Casting",
    foto: "img/teto.jpg",
    desc: "Teto (Clériton Sávio Santos Silva) nasceu em 19 de outubro de 2001, em Jacobina, no interior da Bahia. Começou a escrever músicas aos 12 anos, por influência do pai, e na adolescência gravava de forma independente no próprio quarto, divulgando prévias nas redes sociais. Conhecido como “Rei das Prévias”, ganhou destaque nacional em 2020 e entrou para a 30PRAUM em 2021, tornando-se um dos principais nomes da nova geração do trap brasileiro."
  },
  {
    nome: "WIU",
    tipo: "Casting",
    foto: "img/wiu.jpg",
    desc: "WIU (Vinicius William Sales de Lima) nasceu em 16 de fevereiro de 2002, em Fortaleza (CE). Desde jovem se interessou por hip-hop e produção musical, aprendendo a criar as próprias batidas e composições ainda na adolescência. Divulgava suas músicas de forma independente na internet até ser convidado por Matuê, em 2019, para integrar a 30PRAUM. WIU também atua como produtor, contribuindo para a sonoridade da gravadora."
  },
  {
    nome: "Brandão",
    tipo: "Casting",
    foto: "img/brandao.jpg",
    desc: "Brandão (Gabriel Brandão da Costa), conhecido como Brandão85, nasceu em 18 de fevereiro de 2000, no Ceará. Criado em Caponga (CE), desde jovem se interessou por rap e reggae, desenvolvendo aos poucos uma identidade artística própria. Divulgava suas músicas de forma independente desde 2018, até ser anunciado como integrante da 30PRAUM, em setembro de 2024, durante o show de Matuê no Rock in Rio."
  }
];

const PERGUNTAS = [
  { texto: "Sexta à noite, você está...", opcoes: [
    { texto: "Num rolê com os amigos", artista: "Wiu" },
    { texto: "Em casa, sozinho com fone", artista: "Brandão" },
    { texto: "Na balada, mandando bem", artista: "Teto" },
    { texto: "Na rua, sem hora pra voltar", artista: "Matuê" } ] },
  { texto: "Qual palavra combina mais com você?", opcoes: [
    { texto: "Leve", artista: "Wiu" },
    { texto: "Profundo", artista: "Brandão" },
    { texto: "Confiante", artista: "Teto" },
    { texto: "Misterioso", artista: "Matuê" } ] },
  { texto: "O que mais importa numa música?", opcoes: [
    { texto: "Refrão grudento", artista: "Wiu" },
    { texto: "Letra", artista: "Brandão" },
    { texto: "Flow e atitude", artista: "Teto" },
    { texto: "Batida e clima", artista: "Matuê" } ] },
  { texto: "Escolha uma vibe:", opcoes: [
    { texto: "Animada pra cantar junto", artista: "Wiu" },
    { texto: "Emocional", artista: "Brandão" },
    { texto: "Pesada e cheia de ego", artista: "Teto" },
    { texto: "Viajante, noturna", artista: "Matuê" } ] },
  { texto: "Seu momento ideal de ouvir música:", opcoes: [
    { texto: "Com os amigos", artista: "Wiu" },
    { texto: "Antes de dormir", artista: "Brandão" },
    { texto: "Na academia ou na rua", artista: "Teto" },
    { texto: "Dirigindo à noite", artista: "Matuê" } ] },
  // perguntas só de dados (sem artista)
  { texto: "Onde você mais ouve música?", opcoes: [
    { texto: "Spotify" }, { texto: "YouTube" }, { texto: "Deezer" }, { texto: "Outro" } ] },
  { texto: "Como você conheceu a 30PRAUM?", opcoes: [
    { texto: "Amigos" }, { texto: "TikTok" }, { texto: "Instagram" }, { texto: "Playlist" } ] },
  { texto: "Qual a sua faixa etária?", opcoes: [
    { texto: "Até 17" }, { texto: "18-24" }, { texto: "25-34" }, { texto: "35+" } ] }
];

const MUSICAS_SUGERIDAS = [
  { artista: "Matuê",     titulo: "Mantém" },
  { artista: "Matuê",     titulo: "Anos Luz" },
  { artista: "Matuê",     titulo: "Vampiro" },
  { artista: "Matuê",     titulo: "Honey Babe" },
  { artista: "Matuê",     titulo: "Castlevania" },
  { artista: "Teto",      titulo: "Grécia" },
  { artista: "Teto",      titulo: "YES OR NO" },
  { artista: "Teto",      titulo: "Paypal" },
  { artista: "Teto",      titulo: "Dia Azul" },
  { artista: "WIU",       titulo: "Felina" },
  { artista: "WIU",       titulo: "Horas Iguais" },
  { artista: "WIU",       titulo: "Brinca Demais" },
  { artista: "WIU",       titulo: "Ciumenta" },
  { artista: "Brandão85", titulo: "JAPONÊS" },
  { artista: "Brandão85", titulo: "WARZONE" },
  { artista: "Brandão85", titulo: "Isso é Sério" }
];

// Palavras que indicam versão "diferente" da música (usadas na busca)
const PALAVRAS_EVITAR = ["ao vivo", "live", "remix", "speed", "slowed", "instrumental"];

const TEXTO_FAIXA_ROLANTE = "Matuê ✦ Teto ✦ WIU ✦ Brandão ✦ 30PRAUM ✦ ";