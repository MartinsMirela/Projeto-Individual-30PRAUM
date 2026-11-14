var database = require("../database/config");

function salvar(artista, r, pontos, usuarioId) {
  var uid = usuarioId === null ? "NULL" : usuarioId;

  var instrucao = `
    INSERT INTO respostas_quiz
    (artista_resultado, p1, p2, p3, p4, p5, plataforma, canal, faixa_etaria,
     pontos_matue, pontos_teto, pontos_brandao, pontos_wiu, usuario_id)
    VALUES ('${artista}', '${r[0]}', '${r[1]}', '${r[2]}', '${r[3]}', '${r[4]}', '${r[5]}', '${r[6]}', '${r[7]}',
     ${pontos.matue}, ${pontos.teto}, ${pontos.brandao}, ${pontos.wiu}, ${uid});
  `;
  return database.executar(instrucao);
}

// liga uma resposta já salva a uma pessoa (só se ainda não tiver dono)
function vincular(idResposta, usuarioId) {
  var instrucao = `
    UPDATE respostas_quiz
    SET usuario_id = ${usuarioId}
    WHERE id = ${idResposta} AND usuario_id IS NULL;
  `;
  return database.executar(instrucao);
}

module.exports = { salvar, vincular };