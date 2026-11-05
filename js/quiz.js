// =====================================================
// PÁGINA: QUIZ
// =====================================================
let perguntaAtual = 0;
let pontos = 0;

function paginaQuiz() {
  // Acabaram as perguntas: mostra o resultado
  if (perguntaAtual >= PERGUNTAS.length) {
    let mensagem = "";

    if (pontos >= 4) {
      mensagem = "Fã de carteirinha!";
    } else if (pontos >= 2) {
      mensagem = "Está no caminho.";
    } else {
      mensagem = "Hora de ouvir mais.";
    }

    return `
      <div class="box">
        <h2>Resultado</h2>
        <h1 style="font-size:80px">${pontos}/${PERGUNTAS.length}</h1>
        <p>${mensagem}</p>
        <button class="btn" onclick="reiniciarQuiz()">Jogar de novo</button>
      </div>`;
  }

  // Ainda tem pergunta: mostra a atual
  const pergunta = PERGUNTAS[perguntaAtual];
  let opcoes = "";

  for (let i = 0; i < pergunta.opcoes.length; i++) {
    opcoes += '<button class="opt" onclick="responder(' + i + ')">' + escapar(pergunta.opcoes[i]) + "</button>";
  }

  return `
    <div class="box">
      <h2>Quiz</h2>
      <p class="note">Pergunta ${perguntaAtual + 1} de ${PERGUNTAS.length}</p>
      <h3 style="font-size:28px;margin-bottom:16px">${escapar(pergunta.texto)}</h3>
      ${opcoes}
    </div>`;
}

function responder(escolha) {
  if (escolha === PERGUNTAS[perguntaAtual].certa) {
    pontos++;
  }
  perguntaAtual++;
  desenhar();
}

function reiniciarQuiz() {
  perguntaAtual = 0;
  pontos = 0;
  desenhar();
}