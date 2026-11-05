// =====================================================
// FUNÇÕES AUXILIARES
// =====================================================

// Atalho para document.querySelector
function $(seletor) {
  return document.querySelector(seletor);
}

// Troca caracteres especiais para ninguém conseguir injetar HTML
function escapar(texto) {
  texto = String(texto);
  texto = texto.replace(/&/g, "&amp;");
  texto = texto.replace(/</g, "&lt;");
  texto = texto.replace(/>/g, "&gt;");
  texto = texto.replace(/"/g, "&quot;");
  texto = texto.replace(/'/g, "&#39;");
  return texto;
}

// Minúsculas e sem acento, para comparar nomes ("Matuê" == "matue")
function normalizar(texto) {
  texto = String(texto).toLowerCase();
  texto = texto.normalize("NFD");
  texto = texto.replace(/[\u0300-\u036f]/g, "");
  return texto;
}

// localStorage guarda só texto, por isso usamos JSON
function lerDados(chave) {
  try {
    const texto = localStorage.getItem(chave);
    if (texto) {
      return JSON.parse(texto);
    }
    return null;
  } catch (erro) {
    return null;
  }
}

function gravarDados(chave, valor) {
  try {
    localStorage.setItem(chave, JSON.stringify(valor));
  } catch (erro) {}
}

function apagarDados(chave) {
  try {
    localStorage.removeItem(chave);
  } catch (erro) {}
}