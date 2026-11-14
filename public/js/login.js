// =====================================================
// PÁGINA: LOGIN 
// =====================================================

// --- ESTADO do login ---
let usuario = lerDados("user");

// --- FUNÇÕES ---
function paginaLogin() {
  // Já está logado
  if (usuario) {
    return `
      <div class="box">
        <h2>Olá, ${escapar(usuario.nome)}</h2>
        <p>Você entrou como <b>${escapar(usuario.email)}</b>.</p>
        <a class="btn ghost" href="dashboard.html">Ver Dashboard</a>
        <button class="btn" onclick="sair()">Sair</button>
      </div>`;
  }

  return `
    <div class="box">
      <h2>Login</h2>
      <form onsubmit="entrar(event)">
        <label for="le">E-mail</label>
        <input id="le" type="email" required autocomplete="email">

        <label for="lp">Senha</label>
        <input id="lp" type="password" required autocomplete="off">

        <p id="msgLogin"></p>

        <button class="btn" type="submit">Entrar</button>
        <a class="btn ghost" href="#cadastro">Cadastre-se</a>
      </form>
    </div>`;
}

function entrar(evento) {
  evento.preventDefault();

  var email = $("#le").value.trim();
  var senha = $("#lp").value;
  var msg = $("#msgLogin");

  fetch("/usuarios/autenticar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      emailServer: email,
      senhaServer: senha
    })
  })
    .then(function (resposta) {
      if (!resposta.ok) throw "Email ou senha inválidos";
      return resposta.json();
    })
    .then(function (dados) {
      usuario = { id: dados.id, nome: dados.nome, email: dados.email };
      gravarDados("user", usuario);
      // se a pessoa fez o quiz antes de logar, liga o resultado à conta dela
      if (idRespostaQuiz) {
        fetch("/quiz/vincular", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idResposta: idRespostaQuiz, usuarioId: usuario.id })
        });
        idRespostaQuiz = null;
      }

      if (perguntaAtual >= PERGUNTAS.length) {
        location.hash = "#quiz";
      } else {
        location.hash = "#inicio";
      }
      desenhar();
    })
    .catch(function (erro) {
      console.log("#ERRO: " + erro);
      msg.innerHTML = "Email ou senha inválidos.";
    });
}

function sair() {
  usuario = null;
  apagarDados("user");
  reiniciarQuiz();
}