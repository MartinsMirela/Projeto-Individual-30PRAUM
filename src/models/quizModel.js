var database = require("../database/config");

function salvar(artista, r, pontos, usuarioId) {
  var uid = usuarioId === null ? "NULL" : usuarioId;

  var inserirResposta = `
    INSERT INTO respostas_quiz
    (p1, p2, p3, p4, p5, plataforma, canal, faixa_etaria, fk_usuario)
    VALUES ('${r[0]}', '${r[1]}', '${r[2]}', '${r[3]}', '${r[4]}', '${r[5]}', '${r[6]}', '${r[7]}', ${uid});
  `;

  return database.executar(inserirResposta).then(function (resultado) {
    var idResposta = resultado.insertId;

    var inserirPontos = `
      INSERT INTO pontuacao (artista_id, resposta_id, pontos)
      SELECT idartista, ${idResposta},
        CASE nome
          WHEN 'Matuê' THEN ${pontos.matue}
          WHEN 'Teto' THEN ${pontos.teto}
          WHEN 'Brandão' THEN ${pontos.brandao}
          WHEN 'Wiu' THEN ${pontos.wiu}
        END
      FROM artista;
    `;

    return database.executar(inserirPontos).then(function () {
      return { insertId: idResposta };
    });
  });
}

function vincular(idResposta, usuarioId) {
  var instrucao = `
    UPDATE respostas_quiz
    SET fk_usuario = ${usuarioId}
    WHERE idrespostas_quiz = ${idResposta} AND fk_usuario IS NULL;
  `;
  return database.executar(instrucao);
}

module.exports = { salvar, vincular };