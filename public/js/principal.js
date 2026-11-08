// =====================================================
// MENU
// =====================================================
function desenharMenu(rotaAtual) {
  let html = "";

  for (let i = 0; i < ROTAS.length; i++) {
    const rota = ROTAS[i];
    let classe = "";
    let texto = rota.nome;

    if (rota.id === rotaAtual) {
      classe = "on";
    }
    // Se estiver logado, o botão "Login" mostra o primeiro nome
    if (rota.id === "login" && usuario) {
      texto = escapar(usuario.nome.split(" ")[0]);
    }

    html += '<a href="#' + rota.id + '" class="' + classe + '">' + texto + "</a>";
  }

  $("#nav").innerHTML = html;
}


// =====================================================
// DESENHAR A PÁGINA (roteador)
// =====================================================
function desenhar() {
  // A rota vem do endereço: site.html#quiz -> "quiz"
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
  } else {
    rota = "inicio";
    html = paginaInicio();
  }

  // descobre o nome da rota para colocar no título da aba
  for (let i = 0; i < ROTAS.length; i++) {
    if (ROTAS[i].id === rota) {
      nomeDaRota = ROTAS[i].nome;
    }
  }

  desenharMenu(rota);
  $("#app").innerHTML = html;
  document.title = "30PRAUM · " + nomeDaRota;

  // Na playlist, carrega as músicas da internet na primeira vez
  if (rota === "playlist" && !sugestoesProntas && !carregando) {
    carregarSugestoes();
  }
}


// =====================================================
// INÍCIO DO SITE
// =====================================================
window.addEventListener("hashchange", desenhar);
desenhar();