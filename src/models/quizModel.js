var database = require("../database/config");

function salvar(artista, r) {
  var instrucao = `
    INSERT INTO respostas_quiz
    (artista_resultado, p1, p2, p3, p4, p5, plataforma, canal, faixa_etaria)
    VALUES ('${artista}', '${r[0]}', '${r[1]}', '${r[2]}', '${r[3]}', '${r[4]}', '${r[5]}', '${r[6]}', '${r[7]}');
  `;
  return database.executar(instrucao);
}

module.exports = { salvar };