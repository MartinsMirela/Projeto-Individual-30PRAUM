// =====================================================
// DADOS (vetores)
// =====================================================
const ROTAS = [
  { id: "inicio",   nome: "Início" },
  { id: "artistas", nome: "Artistas" },
  { id: "playlist", nome: "Playlist" },
  { id: "quiz",     nome: "Quiz" },
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
  { texto: "Quem fundou a 30PRAUM?",                      opcoes: ["Teto", "Matuê e Clara Mendes", "WIU", "Brandão"],     certa: 1 },
  { texto: "De qual cidade é o Matuê?",                   opcoes: ["São Paulo", "Rio de Janeiro", "Fortaleza", "Recife"], certa: 2 },
  { texto: "Em que ano saiu o álbum “Máquina do Tempo”?", opcoes: ["2018", "2019", "2020", "2022"],                       certa: 2 },
  { texto: "Em que ano saiu o álbum “333”?",              opcoes: ["2022", "2020", "2017", "2024"],                       certa: 0 },
  { texto: "A coleção ISSO É TRAP é do:",                 opcoes: ["Matuê", "Teto", "WIU", "Brandão"],                    certa: 3 }
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