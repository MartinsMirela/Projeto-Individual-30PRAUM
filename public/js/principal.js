
// =====================================================
// MENU
// =====================================================
function desenharMenu(rotaAtual) {
  let html = "";

  for (let i = 0; i < ROTAS.length; i++) {
    const rota = ROTAS[i];

    if (rota.id === "cadastro" && usuario) {
      continue;
    }

    let classe = "";
    let texto = rota.nome;

    if (rota.id === rotaAtual) {
      classe = "on";
    }

    // Se estiver logado, o botão Login mostra o primeiro nome
    if (rota.id === "login" && usuario) {
      texto = escapar(usuario.nome.split(" ")[0]);
    }

    html += '<a href="#' + rota.id + '" class="' + classe + '">' + texto + "</a>";
  }

  $("#nav").innerHTML = html;
}


// =====================================================
// DESENHAR A PÁGINA (ROTEADOR)
// =====================================================
function desenhar() {
  // Identifica a rota pela URL
  let rota = location.hash.slice(1);

  let html = "";
  let nomeDaRota = "";

  if (rota === "artistas") {
    html = paginaArtistas();

  } else if (rota === "playlist") {
    html = paginaPlaylist();

  } else if (rota === "quiz") {
    html = paginaQuiz();

  } else if (rota === "login") {
    html = paginaLogin();

  } else if (rota === "cadastro") {
    html = paginaCadastro();

  } else if (rota === "inicio" || rota === "") {
    rota = "inicio";
    html = paginaInicio();

  } else {
    rota = "memoria";
    html = paginaMemoria();
  }

  // Descobre o nome da rota para o título da aba
  for (let i = 0; i < ROTAS.length; i++) {
    if (ROTAS[i].id === rota) {
      nomeDaRota = ROTAS[i].nome;
    }
  }

  desenharMenu(rota);

  $("#app").innerHTML = html;

  document.title = "30PRAUM · " + nomeDaRota;

  // Carrega as sugestões de músicas na playlist
  if (rota === "playlist" && !sugestoesProntas && !carregando) {
    carregarSugestoes();
  }
}


// =====================================================
// INÍCIO DO SITE
// =====================================================

// Detecta mudanças nas rotas
window.addEventListener("hashchange", desenhar);

// Desenha a página inicial ao abrir o site
desenhar();
