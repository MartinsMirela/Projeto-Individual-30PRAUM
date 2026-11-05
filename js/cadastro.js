// =====================================================
// PÁGINA: CADASTRO (simulado)
// A função entrar() vem de login/login.js
// =====================================================
function paginaCadastro() {
  return `
    <div class="box">
      <h2>Cadastro</h2>
      <form onsubmit="entrar(event)">
        <label for="ln">Nome</label>
        <input id="ln" required autocomplete="name">

        <label for="le">E-mail</label>
        <input id="le" type="email" required autocomplete="email">

        <label for="lp">Senha</label>
        <input id="lp" type="password" required minlength="4" autocomplete="off">

        <button class="btn" type="submit">Criar conta</button>
        <a class="btn ghost" href="#login">Já tenho conta</a>
      </form>
    </div>`;
}