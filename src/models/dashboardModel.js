var database = require("../database/config");

function contar(coluna) {
  var instrucao = `
    SELECT ${coluna} AS nome, COUNT(*) AS total
    FROM respostas_quiz
    GROUP BY ${coluna};
  `;
  return database.executar(instrucao);
}

// artista que mais pontuou em cada resposta
function contarArtistas() {
  var instrucao = `
    SELECT a.nome AS nome, COUNT(*) AS total
    FROM pontuacao p
    JOIN artista a ON a.idartista = p.artista_id
    WHERE p.pontos = (
      SELECT MAX(p2.pontos) FROM pontuacao p2
      WHERE p2.resposta_id = p.resposta_id
    )
    GROUP BY a.nome;
  `;
  return database.executar(instrucao);
}

function porDia() {
  var instrucao = `
    SELECT DATE_FORMAT(data_hora, '%d/%m') AS nome, COUNT(*) AS total
    FROM respostas_quiz
    WHERE data_hora >= DATE_SUB(NOW(), INTERVAL 7 DAY)
    GROUP BY DATE_FORMAT(data_hora, '%d/%m'), DATE(data_hora)
    ORDER BY DATE(data_hora);
  `;
  return database.executar(instrucao);
}

function ultimaDoUsuario(usuarioId) {
  var instrucao = `
    SELECT r.p1, r.p2, r.p3, r.p4, r.p5, r.plataforma, r.canal, r.faixa_etaria,
      (SELECT a.nome FROM pontuacao p
        JOIN artista a ON a.idartista = p.artista_id
        WHERE p.resposta_id = r.idrespostas_quiz
        ORDER BY p.pontos DESC, a.idartista LIMIT 1) AS artista_resultado,
      COALESCE((SELECT p.pontos FROM pontuacao p JOIN artista a ON a.idartista = p.artista_id
        WHERE p.resposta_id = r.idrespostas_quiz AND a.nome = 'Matuê'), 0) AS pontos_matue,
      COALESCE((SELECT p.pontos FROM pontuacao p JOIN artista a ON a.idartista = p.artista_id
        WHERE p.resposta_id = r.idrespostas_quiz AND a.nome = 'Teto'), 0) AS pontos_teto,
      COALESCE((SELECT p.pontos FROM pontuacao p JOIN artista a ON a.idartista = p.artista_id
        WHERE p.resposta_id = r.idrespostas_quiz AND a.nome = 'Brandão'), 0) AS pontos_brandao,
      COALESCE((SELECT p.pontos FROM pontuacao p JOIN artista a ON a.idartista = p.artista_id
        WHERE p.resposta_id = r.idrespostas_quiz AND a.nome = 'Wiu'), 0) AS pontos_wiu
    FROM respostas_quiz r
    WHERE r.fk_usuario = ${usuarioId}
    ORDER BY r.idrespostas_quiz DESC
    LIMIT 1;
  `;
  return database.executar(instrucao);
}

function todasRespostas() {
  var instrucao = `
    SELECT r.p1, r.p2, r.p3, r.p4, r.p5, r.plataforma, r.canal, r.faixa_etaria,
      (SELECT a.nome FROM pontuacao p
        JOIN artista a ON a.idartista = p.artista_id
        WHERE p.resposta_id = r.idrespostas_quiz
        ORDER BY p.pontos DESC, a.idartista LIMIT 1) AS artista_resultado
    FROM respostas_quiz r;
  `;
  return database.executar(instrucao);
}

module.exports = { contar, contarArtistas, porDia, ultimaDoUsuario, todasRespostas };