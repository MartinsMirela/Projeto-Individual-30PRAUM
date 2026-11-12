// ---------- VARIÁVEIS (a "memória" do quiz) ----------
let perguntaAtual = 0;   // número da pergunta na tela (0 = primeira)
let pontosArtistas = { "Matuê": 0, "Teto": 0, "Brandão": 0, "Wiu": 0 };
let respostas = [];      // guarda o texto de cada resposta
let resultadoFinal = ""; // artista que deu no final

// ---------- QUANDO O USUÁRIO CLICA EM UMA OPÇÃO ----------
function responder(escolha) {
  // pega a opção que foi clicada
  const opcao = PERGUNTAS[perguntaAtual].opcoes[escolha];

  // se a opção tem artista, soma 1 ponto para ele
  if (opcao.artista) {
    pontosArtistas[opcao.artista]++;
  }

  // guarda o texto da resposta e vai para a próxima pergunta
  respostas.push(opcao.texto);
  perguntaAtual++;

  // se acabaram as perguntas, calcula e envia o resultado
  if (perguntaAtual >= PERGUNTAS.length) {
    calcularResultado();
    enviarResultado();
  }

  desenhar(); // redesenha a tela
}

// ---------- DESCOBRE QUAL ARTISTA TEVE MAIS PONTOS ----------
function calcularResultado() {
  let maior = -1;
  for (let artista in pontosArtistas) {
    if (pontosArtistas[artista] > maior) {
      maior = pontosArtistas[artista];
      resultadoFinal = artista;
    }
  }
}

// ---------- ENVIA PARA A API (salva no banco) ----------
function enviarResultado() {
  fetch("/quiz", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ artista: resultadoFinal, respostas: respostas })
  });
}

// ---------- ZERA TUDO PARA JOGAR DE NOVO ----------
function reiniciarQuiz() {
  perguntaAtual = 0;
  pontosArtistas = { "Matuê": 0, "Teto": 0, "Brandão": 0, "Wiu": 0 };
  respostas = [];
  resultadoFinal = "";
  desenhar();
}

// ---------- MONTA O HTML DA TELA ----------
function paginaQuiz() {
  // se acabou o quiz, mostra o resultado
  if (perguntaAtual >= PERGUNTAS.length) {
    return `
      <div class="box">
        <h2>Seu resultado</h2>
        <h1 style="font-size:60px">${escapar(resultadoFinal)}</h1>
        <p>Esse é o artista da 30PRAUM que mais combina com você!</p>
        <button class="btn" onclick="reiniciarQuiz()">Refazer</button>
      </div>`;
  }

  // senão, mostra a pergunta atual com um botão para cada opção
  const pergunta = PERGUNTAS[perguntaAtual];
  let opcoes = "";

  for (let i = 0; i < pergunta.opcoes.length; i++) {
    opcoes += '<button class="opt" onclick="responder(' + i + ')">' + escapar(pergunta.opcoes[i].texto) + "</button>";
  }

  return `
    <div class="box">
      <h2>Quem você seria da 30PRAUM?</h2>
      <p class="note">Pergunta ${perguntaAtual + 1} de ${PERGUNTAS.length}</p>
      <h3 style="font-size:28px;margin-bottom:16px">${escapar(pergunta.texto)}</h3>
      ${opcoes}
    </div>`;
}