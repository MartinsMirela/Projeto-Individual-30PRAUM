var database = require("../database/config");

// conta quantas respostas existem para cada valor de uma coluna
function contar(coluna) {
  var instrucao = `
    SELECT ${coluna} AS nome, COUNT(*) AS total
    FROM respostas_quiz
    GROUP BY ${coluna};
  `;
  return database.executar(instrucao);
}

// conta respostas por dia, nos últimos 7 dias
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

// resultado mais recente de uma pessoa
function ultimaDoUsuario(usuarioId) {
  var instrucao = `
    SELECT artista_resultado, p1, p2, p3, p4, p5, plataforma,
           pontos_matue, pontos_teto, pontos_brandao, pontos_wiu
    FROM respostas_quiz
    WHERE usuario_id = ${usuarioId}
    ORDER BY id DESC
    LIMIT 1;
  `;
  return database.executar(instrucao);
}

// respostas de todo mundo, para comparar
function todasRespostas() {
  var instrucao = `
    SELECT artista_resultado, p1, p2, p3, p4, p5, plataforma
    FROM respostas_quiz;
  `;
  return database.executar(instrucao);
}

module.exports = { contar, porDia, ultimaDoUsuario, todasRespostas };