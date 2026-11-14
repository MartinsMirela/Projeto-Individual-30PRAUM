// =====================================================
// PÁGINA: INÍCIO
// =====================================================
function cardDestaque(rota, etiqueta, titulo, texto) {
  return `
    <a class="card" href="#${rota}" style="text-decoration:none;color:inherit">
      <span class="tag">${etiqueta}</span>
      <h3>${titulo}</h3>
      <p>${texto}</p>
    </a>`;
}

function paginaInicio() {
  return `
    <section class="hero">
      <div class="formas">
        <span class="f f1"><svg viewBox="0 0 80 60" fill="#c6ff00"><path d="M6 52V16l18 14L40 6l16 24 18-14v36z"/><circle cx="6" cy="14" r="5"/><circle cx="40" cy="5" r="5"/><circle cx="74" cy="14" r="5"/></svg></span>
        <span class="f f2"><svg viewBox="0 0 80 80"><circle cx="40" cy="40" r="36" fill="#c6ff00"/><circle cx="40" cy="40" r="28" fill="none" stroke="#000" stroke-width="3"/><text x="40" y="54" text-anchor="middle" font-family="Anton,Impact,sans-serif" font-size="40" fill="#000">$</text></svg></span>
        <span class="f f3"><svg viewBox="0 0 80 70" fill="none" stroke="#c6ff00" stroke-width="4" stroke-linejoin="round"><path d="M20 6h40l16 22-36 40L4 28z"/><path d="M4 28h72M28 28l12 40 12-40M20 6l8 22 12-22 12 22 8-22"/></svg></span>
        <span class="f f4"><svg viewBox="0 0 90 90"><circle cx="45" cy="45" r="42" fill="#c6ff00"/><circle cx="45" cy="45" r="32" fill="none" stroke="#000" stroke-width="2"/><circle cx="45" cy="45" r="24" fill="none" stroke="#000" stroke-width="2"/><circle cx="45" cy="45" r="14" fill="#000"/><circle cx="45" cy="45" r="4" fill="#c6ff00"/></svg></span>
        <span class="f f5">808</span>
      </div>
      <h1>Isso é<br><em>Real Trap</em></h1>
      <p>Fundada em 2016, em Fortaleza (CE), por Matuê e Clara Mendes, a 30PRAUM é uma gravadora independente que revolucionou o trap brasileiro, levando a cultura nordestina para todo o país. Com uma identidade autêntica e inovadora, tornou-se referência no cenário musical, reunindo artistas como Matuê, Teto, WIU e Brandão. Mais do que uma gravadora, a 30PRAUM representa um movimento de criatividade, atitude e valorização da música urbana brasileira.</p>
      <p>
        <a class="btn" href="#artistas">Ver artistas</a>
        <a class="btn ghost" href="#quiz">Jogar quiz</a>
      </p>
    </section>

    <div class="ticker"><div>${TEXTO_FAIXA_ROLANTE.repeat(8)}</div></div>

    <h2>Destaques</h2>
    <div class="grid">
      ${cardDestaque("artistas", "Novo",        "Artistas", "Conheça o casting da casa.")}
      ${cardDestaque("playlist", "Monte a sua", "Playlist", "Adicione faixas e organize do seu jeito.")}
      ${cardDestaque("quiz",     "5 perguntas", "Quiz",     "Será que você é fã de verdade?")}
      ${cardDestaque("memoria",  "Jogo da memória", "Memória", "Se desafie e encontre os elementos que representam a 30PRAUM.")}
    </div>`;
}