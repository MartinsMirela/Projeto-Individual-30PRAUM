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

module.exports = { contar, porDia };