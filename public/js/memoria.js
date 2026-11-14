// =====================================================
// PÁGINA: JOGO DA MEMÓRIA
// =====================================================

// --- DADOS: os 5 símbolos da página inicial (cada um vira um par) ---
const SIMBOLOS = [
    { id: "coroa", html: '<svg viewBox="0 0 80 60" fill="#c6ff00"><path d="M6 52V16l18 14L40 6l16 24 18-14v36z"/><circle cx="6" cy="14" r="5"/><circle cx="40" cy="5" r="5"/><circle cx="74" cy="14" r="5"/></svg>' },
    { id: "moeda", html: '<svg viewBox="0 0 80 80"><circle cx="40" cy="40" r="36" fill="#c6ff00"/><circle cx="40" cy="40" r="28" fill="none" stroke="#000" stroke-width="3"/><text x="40" y="54" text-anchor="middle" font-family="Anton,Impact,sans-serif" font-size="40" fill="#000">$</text></svg>' },
    { id: "diamante", html: '<svg viewBox="0 0 80 70" fill="none" stroke="#c6ff00" stroke-width="4" stroke-linejoin="round"><path d="M20 6h40l16 22-36 40L4 28z"/><path d="M4 28h72M28 28l12 40 12-40M20 6l8 22 12-22 12 22 8-22"/></svg>' },
    { id: "disco", html: '<svg viewBox="0 0 90 90"><circle cx="45" cy="45" r="42" fill="#c6ff00"/><circle cx="45" cy="45" r="32" fill="none" stroke="#000" stroke-width="2"/><circle cx="45" cy="45" r="24" fill="none" stroke="#000" stroke-width="2"/><circle cx="45" cy="45" r="14" fill="#000"/><circle cx="45" cy="45" r="4" fill="#c6ff00"/></svg>' },
    { id: "808", html: '<span class="selo">808</span>' }
];

// --- ESTADO do jogo ---
let cartas = [];        // as 10 cartas, já embaralhadas
let viradas = [];       // posições das cartas viradas agora (0, 1 ou 2)
let jogadas = 0;        // cada tentativa com duas cartas conta uma jogada
let travado = false;    // true enquanto espera para desvirar duas cartas erradas
let recorde = lerDados("recordeMemoria");   // menor número de jogadas (ou null)
let audio = null;       // "motor" de som, criado no primeiro clique


// =====================================================
// SOM (feito por código, sem arquivo de áudio)
// =====================================================

// Toca uma nota: frequência (Hz), quando começa (s) e quanto dura (s)
function tocarNota(frequencia, inicio, duracao) {
    const oscilador = audio.createOscillator();
    const volume = audio.createGain();
    const comeco = audio.currentTime + inicio;

    oscilador.type = "square";                  // som "de videogame"
    oscilador.frequency.value = frequencia;
    volume.gain.setValueAtTime(0.08, comeco);
    volume.gain.exponentialRampToValueAtTime(0.001, comeco + duracao);   // some aos poucos

    oscilador.connect(volume);
    volume.connect(audio.destination);
    oscilador.start(comeco);
    oscilador.stop(comeco + duracao);
}

function tocarSom(tipo) {
    try {
        // o navegador só deixa criar o som depois de um clique do usuário
        if (audio === null) {
            audio = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audio.state === "suspended") {
            audio.resume();
        }

        if (tipo === "acerto") {
            tocarNota(660, 0, 0.1);
            tocarNota(880, 0.08, 0.1);
            tocarNota(1320, 0.16, 0.3);
        } else if (tipo === "erro") {
            tocarNota(220, 0, 0.18);
        } else if (tipo === "vitoria") {
            tocarNota(523, 0, 0.15);
            tocarNota(659, 0.15, 0.15);
            tocarNota(784, 0.3, 0.15);
            tocarNota(1047, 0.45, 0.5);
        }
    } catch (erro) {
        // se o navegador não tiver som, o jogo continua sem ele
    }
}


// =====================================================
// LÓGICA DO JOGO
// =====================================================

// Cria as 10 cartas (2 de cada símbolo) e embaralha. NÃO redesenha a tela.
function montarCartas() {
    cartas = [];
    viradas = [];
    jogadas = 0;
    travado = false;

    for (let i = 0; i < SIMBOLOS.length; i++) {
        cartas.push({ simbolo: i, virada: false, achada: false });
        cartas.push({ simbolo: i, virada: false, achada: false });
    }

    // embaralhar: troca cada carta com outra de posição aleatória
    for (let i = cartas.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const guardada = cartas[i];
        cartas[i] = cartas[j];
        cartas[j] = guardada;
    }
}

// Todas as cartas já foram combinadas?
function jogoTerminou() {
    for (let i = 0; i < cartas.length; i++) {
        if (!cartas[i].achada) {
            return false;
        }
    }
    return true;
}

function virarCarta(i) {
    // ignora o clique se estiver esperando, ou se a carta já está virada/achada
    if (travado || cartas[i].virada || cartas[i].achada) {
        return;
    }

    cartas[i].virada = true;
    viradas.push(i);

    // só confere quando houver duas cartas viradas
    if (viradas.length === 2) {
        jogadas++;
        const a = viradas[0];
        const b = viradas[1];

        if (cartas[a].simbolo === cartas[b].simbolo) {
            // ACERTOU: as duas ficam viradas para sempre
            cartas[a].achada = true;
            cartas[b].achada = true;
            viradas = [];

            if (jogoTerminou()) {
                if (recorde === null || jogadas < recorde) {
                    recorde = jogadas;
                    gravarDados("recordeMemoria", recorde);
                }
                tocarSom("vitoria");
            } else {
                tocarSom("acerto");
            }
        } else {
            // ERROU: espera 0,8 segundo e desvira as duas
            travado = true;
            tocarSom("erro");
            desenhar();

            setTimeout(function () {
                cartas[a].virada = false;
                cartas[b].virada = false;
                viradas = [];
                travado = false;
                desenhar();
            }, 800);
            return;
        }
    }

    desenhar();
}

function reiniciarMemoria() {
    montarCartas();
    desenhar();
}


// =====================================================
// A TELA
// =====================================================
function paginaMemoria() {
    let html = "";

    for (let i = 0; i < cartas.length; i++) {
        const carta = cartas[i];
        let classe = "";
        let conteudo = "?";

        if (carta.achada) {
            classe = "achada";
            conteudo = SIMBOLOS[carta.simbolo].html;
        } else if (carta.virada) {
            classe = "virada";
            conteudo = SIMBOLOS[carta.simbolo].html;
        }

        html += '<button class="carta ' + classe + '" onclick="virarCarta(' + i + ')" aria-label="Carta ' + (i + 1) + '">' + conteudo + "</button>";
    }

    // mensagem de baixo: fim de jogo ou andamento
    let mensagem = "";
    if (jogoTerminou()) {
        mensagem = "<h3>Você venceu em " + jogadas + " jogadas!</h3>";
    }

    let textoRecorde = "—";
    if (recorde !== null) {
        textoRecorde = recorde + " jogadas";
    }

    let aviso = "";
    if (!usuario) {
        aviso = `<p class="note" style="color: #c6ff00;"><b><i>Cadastre-se ou faça o login para ter acesso a itens exclusivos :)</i></b></p>`;
    }

    return `
    <h2>Jogo da Memória</h2>
    <p>Encontre os pares dos símbolos que representam a 30PRAUM.</p>
    <p class="note">Clique nas cartas para virá-las. Se errar, elas serão desviradas.</p>
    <p class="note" style="color: #c6ff00;">Dica: memorize a posição dos símbolos para encontrar os pares mais rápido!</p>
    <p class="note"><b>Bom jogo!</b></p>
    <p class="note">Jogadas: <b>${jogadas}</b> · Recorde: <b>${textoRecorde}</b></p>
    <div class="tabuleiro">${html}</div>
    ${mensagem}
    <p><button class="btn" onclick="reiniciarMemoria()">Jogar de novo</button></p>
    ${aviso}`;
}

// prepara o primeiro jogo quando o arquivo carrega (sem redesenhar)
montarCartas();