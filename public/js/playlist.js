// =====================================================
// PÁGINA: PLAYLIST
// =====================================================

// --- ESTADO da playlist ---
let faixas = lerDados("playlist");
if (faixas === null) {
  faixas = [];
}
let faixaTocando = -1;          // índice da faixa tocando (-1 = nenhuma)

let sugestoes = [];             // músicas que vêm da internet
let carregando = false;
let sugestoesProntas = false;
let erroBusca = false;

// o "tocador": um objeto de áudio que vive fora do HTML
const player = new Audio();
player.onended = function () {
  faixaTocando = -1;
  desenhar();
};

// --- FUNÇÕES ---

// Verifica se o título tem alguma palavra da lista PALAVRAS_EVITAR
function ehVersaoDiferente(titulo) {
  titulo = titulo.toLowerCase();
  for (let i = 0; i < PALAVRAS_EVITAR.length; i++) {
    if (titulo.includes(PALAVRAS_EVITAR[i])) {
      return true;
    }
  }
  return false;
}

// Verifica se uma música (pelo id) já está na playlist
function estaNaPlaylist(id) {
  for (let i = 0; i < faixas.length; i++) {
    if (faixas[i].id === id) {
      return true;
    }
  }
  return false;
}

// Dado o resultado de uma busca, escolhe a melhor música (ou null)
function escolherMusica(resultados, artistaPedido, tituloPedido) {
  const artistaCerto = normalizar(artistaPedido);
  const tituloCerto = normalizar(tituloPedido);
  let primeira = null;       // primeira música válida encontrada
  let original = null;       // primeira válida que NÃO é ao vivo/remix etc.

  for (let i = 0; i < resultados.length; i++) {
    const x = resultados[i];

    // precisa ter prévia, e ser do artista e da música pedidos
    if (x.previewUrl
        && normalizar(x.artistName).includes(artistaCerto)
        && normalizar(x.trackName).includes(tituloCerto)) {

      if (primeira === null) {
        primeira = x;
      }
      if (original === null && !ehVersaoDiferente(x.trackName)) {
        original = x;
      }
    }
  }

  // prefere a versão original; se não houver, usa a primeira
  if (original !== null) {
    return original;
  }
  return primeira;
}

// Busca as músicas na internet (iTunes), uma de cada vez
async function carregarSugestoes() {
  carregando = true;
  erroBusca = false;
  desenhar();

  try {
    const lista = [];

    for (let i = 0; i < MUSICAS_SUGERIDAS.length; i++) {
      const item = MUSICAS_SUGERIDAS[i];
      const termo = item.artista + " " + item.titulo;
      const url = "https://itunes.apple.com/search?term=" + encodeURIComponent(termo)
        + "&media=music&entity=song&limit=25&country=BR";

      const resposta = await fetch(url);
      const dados = await resposta.json();
      const m = escolherMusica(dados.results, item.artista, item.titulo);

      // só adiciona se achou e se ainda não está na lista
      if (m !== null) {
        let repetida = false;
        for (let j = 0; j < lista.length; j++) {
          if (lista[j].id === m.trackId) {
            repetida = true;
          }
        }
        if (!repetida) {
          lista.push({
            id: m.trackId,
            titulo: m.trackName,
            artista: m.artistName,
            preview: m.previewUrl,
            capa: m.artworkUrl100
          });
        }
      }
    }

    sugestoes = lista;
  } catch (erro) {
    erroBusca = true;
  }

  carregando = false;
  sugestoesProntas = true;
  desenhar();
}

function paginaPlaylist() {
  // --- lista de músicas sugeridas ---
  let sugestoesHtml = "";

  if (carregando) {
    sugestoesHtml = '<p class="note">Carregando músicas…</p>';
  } else if (erroBusca) {
    sugestoesHtml = '<p class="note">Não deu para carregar as músicas. Confira sua internet e recarregue a página.</p>';
  } else if (sugestoes.length === 0) {
    sugestoesHtml = '<p class="note">Nenhuma música encontrada.</p>';
  } else {
    for (let i = 0; i < sugestoes.length; i++) {
      const musica = sugestoes[i];
      let textoBotao = "Adicionar";
      if (estaNaPlaylist(musica.id)) {
        textoBotao = "Tocar";
      }

      sugestoesHtml += `
        <div class="trk">
          <img class="capa" src="${escapar(musica.capa)}" alt="">
          <div>
            <b>${escapar(musica.titulo)}</b>
            <small>${escapar(musica.artista)}</small>
          </div>
          <button class="btn" onclick="adicionarSugestao(${i})">${textoBotao}</button>
        </div>`;
    }
  }

  // --- minha playlist ---
  let minhaLista = "";

  if (faixas.length === 0) {
    minhaLista = '<p class="note">Sua playlist está vazia. Adicione uma música acima.</p>';
  } else {
    for (let i = 0; i < faixas.length; i++) {
      const faixa = faixas[i];
      let classe = "";
      let icone = "▶";
      let rotulo = "Tocar";
      let equalizador = "";
      let capa = "";

      if (i === faixaTocando) {
        classe = "on";
        icone = "❚❚";
        rotulo = "Pausar";
        equalizador = '<span class="eq"><i></i><i></i><i></i></span>';
      }
      if (faixa.capa) {
        capa = '<img class="capa" src="' + escapar(faixa.capa) + '" alt="">';
      }

      minhaLista += `
        <div class="trk ${classe}">
          <button class="pl" onclick="alternarFaixa(${i})" aria-label="${rotulo}">${icone}</button>
          ${capa}
          <div>
            <b>${escapar(faixa.titulo)}</b>
            <small>${escapar(faixa.artista)}</small>
          </div>
          ${equalizador}
          <button class="rm" onclick="removerFaixa(${i})" aria-label="Remover">×</button>
        </div>`;
    }
  }

  return `
    <h2>Músicas</h2>
    ${sugestoesHtml}

    <h2 style="margin-top:32px">Minha playlist</h2>
    ${minhaLista}

    <p class="note">Prévias de 30 segundos, fornecidas pela iTunes Search API. Para ouvir completo, procure as faixas no seu app de música favorito.</p>`;
}

// --- ações da playlist ---
function tocarFaixa(indice) {
  const faixa = faixas[indice];
  if (!faixa || !faixa.preview) {
    return;
  }

  player.src = faixa.preview;
  player.play().catch(function () {});   // o navegador pode bloquear o áudio; ignoramos o erro
  faixaTocando = indice;
}

function pararFaixa() {
  player.pause();
  faixaTocando = -1;
}

function adicionarSugestao(indice) {
  const musica = sugestoes[indice];
  let posicao = -1;

  // procura a música na playlist
  for (let i = 0; i < faixas.length; i++) {
    if (faixas[i].id === musica.id) {
      posicao = i;
    }
  }

  // se não achou, adiciona
  if (posicao === -1) {
    faixas.push(musica);
    gravarDados("playlist", faixas);
    posicao = faixas.length - 1;
  }

  tocarFaixa(posicao);
  desenhar();
}

function alternarFaixa(indice) {
  if (faixaTocando === indice) {
    pararFaixa();
  } else {
    tocarFaixa(indice);
  }
  desenhar();
}

function removerFaixa(indice) {
  if (faixaTocando === indice) {
    pararFaixa();
  } else if (faixaTocando > indice) {
    faixaTocando--;   // a lista "andou" uma posição para trás
  }

  faixas.splice(indice, 1);
  gravarDados("playlist", faixas);
  desenhar();
}