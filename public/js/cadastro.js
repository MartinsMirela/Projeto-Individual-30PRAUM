function paginaCadastro() {
  return `
    <div class="box">
      <h2>Cadastro</h2>
      <form onsubmit="cadastrar(event)" novalidate>
        <label for="ln">Nome</label>
        <input id="ln" required autocomplete="name">

        <label for="le">E-mail</label>
        <input id="le" type="email" required autocomplete="email">

        <label for="lp">Senha</label>
        <input id="lp" type="password" required minlength="4" autocomplete="off" oninput="mostrarForca()">
        <small id="forcaSenha"></small>

        <p id="msgCadastro"></p>

        <button class="btn" type="submit">Criar conta</button>
        <a class="btn ghost" href="#login">Já tenho conta</a>
      </form>
    </div>`;
}

function avaliarSenha(senha) {
  var pontos = 0;
  if (senha.length >= 8) pontos++;
  if (/[A-Z]/.test(senha)) pontos++;
  if (/[a-z]/.test(senha)) pontos++;
  if (/[0-9]/.test(senha)) pontos++;
  if (/[^A-Za-z0-9]/.test(senha)) pontos++; 

  var nivel = 'Fraca';
  if (pontos >= 5) nivel = 'Forte';
  else if (pontos >= 3 && senha.length >= 8) nivel = 'Média';

  return  { nivel: nivel, pontos: pontos };
}

function mostrarForca() {
  var senha = document.getElementById("lp").value;
  var aviso = document.getElementById("forcaSenha");

  if (senha === "") {
    aviso.innerHTML = ""; 
    return; 
  }

  var r = avaliarSenha(senha);
  var cores = {"Fraca": "red", "Média": "orange", "Forte": "green"};

  aviso.style.color = cores[r.nivel];
  aviso.innerHTML = "Senha: " + r.nivel + 
  (r.nivel == "Forte" ? "" : " (mínimo 8 caracteres, letras maiúsculas, minúsculas, números e símbolos)");
}

function cadastrar(e) {
  e.preventDefault();

  var nome = document.getElementById("ln").value;
  var email = document.getElementById("le").value;
  var senha = document.getElementById("lp").value;
  var msg = document.getElementById("msgCadastro");

  if (nome == "" || email == "" || senha == "") {
    msg.innerHTML = "Todos os campos são obrigatórios.";
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    msg.innerHTML = "E-mail inválido. Use o formato: exemplo@dominio.com";
    return;
  }

  if (avaliarSenha(senha).nivel == "Fraca") {
    msg.innerHTML = "Senha muito fraca. Escolha uma senha mais forte.";
    return;
  }

  fetch("/usuarios/cadastrar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nomeServer: nome,
      emailServer: email,
      senhaServer: senha
    })
  })
    .then(function (resposta) {
      if (resposta.ok) {
        msg.innerHTML = "Cadastro realizado com sucesso! Redirecionando para o login...";
        setTimeout(function () { location.hash = "login"; }, 1500);
      } else {
        throw "Erro ao cadastrar";
      }
    })
    .catch(function (erro) {
      console.log("#ERRO: " + erro);
      msg.innerHTML = "Não foi possível cadastrar. Tente outro e-mail.";
    });
}