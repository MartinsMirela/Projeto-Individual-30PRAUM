var dashboardModel = require("../models/dashboardModel");

// transforma [{nome: "Teto", total: 5}] em { "Teto": 5 }
function virarObjeto(linhas) {
  var obj = {};
  for (var i = 0; i < linhas.length; i++) {
    obj[linhas[i].nome] = linhas[i].total;
  }
  return obj;
}

function resumo(req, res) {
  // roda as 5 consultas juntas e espera todas terminarem
  Promise.all([
    dashboardModel.contar("artista_resultado"),
    dashboardModel.contar("plataforma"),
    dashboardModel.contar("p5"),
    dashboardModel.contar("faixa_etaria"),
    dashboardModel.contar("p3")
  ])
    .then(function (r) {
      res.json({
        artistas: virarObjeto(r[0]),
        plataformas: virarObjeto(r[1]),
        momento: virarObjeto(r[2]),
        faixaEtaria: virarObjeto(r[3]),
        importa: virarObjeto(r[4])
      });
    })
    .catch(function (erro) {
      console.log(erro);
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = { resumo };