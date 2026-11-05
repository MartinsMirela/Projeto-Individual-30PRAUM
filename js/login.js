// =====================================================
// PÁGINA: LOGIN (simulado, não tem servidor)
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
        <button class="btn" onclick="sair()">Sair</button>
      </div>`;
  }

  return `
    <div class="box">
      <h2>Login</h2>
      <form onsubmit="entrar(event)">
        <label for="ln">Nome</label>
        <input id="ln" required autocomplete="name">

        <label for="le">E-mail</label>
        <input id="le" type="email" required autocomplete="email">

        <label for="lp">Senha</label>
        <input id="lp" type="password" required minlength="4" autocomplete="off">

        <button class="btn" type="submit">Entrar</button>
        <a class="btn ghost" href="#cadastro">Cadastre-se</a>
      </form>
    </div>`;
}

// Usada pelo login E pelo cadastro (o site é simulado)
function entrar(evento) {
  evento.preventDefault();   // impede a página de recarregar ao enviar o formulário
  usuario = {
    nome: $("#ln").value.trim(),
    email: $("#le").value.trim()
  };
  gravarDados("user", usuario);
  location.hash = "#login";  // vai para a tela de "já logado"
  desenhar();
}

function sair() {
  usuario = null;
  apagarDados("user");
  desenhar();
}