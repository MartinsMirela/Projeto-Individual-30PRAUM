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

// resultado de uma pessoa comparado com o público
function individual(req, res) {
  var usuarioId = parseInt(req.params.usuarioId);

  if (isNaN(usuarioId)) {
    res.status(400).send("Id inválido");
    return;
  }

  Promise.all([
    dashboardModel.ultimaDoUsuario(usuarioId),
    dashboardModel.todasRespostas()
  ])
    .then(function (r) {
      var minhas = r[0];
      var todas = r[1];

      if (minhas.length == 0) {
        res.status(404).send("Essa pessoa ainda não fez o quiz");
        return;
      }

      var eu = minhas[0];

      // afinidade: pontos de cada artista ÷ total de pontos × 100
      var pontos = {
        "Matuê": eu.pontos_matue,
        "Teto": eu.pontos_teto,
        "Brandão": eu.pontos_brandao,
        "Wiu": eu.pontos_wiu
      };

      var somaPontos = 0;
      for (const nome in pontos) {
        somaPontos += pontos[nome];
      }

      var afinidade = {};
      for (const nome in pontos) {
        afinidade[nome] = somaPontos > 0 ? Math.round(pontos[nome] / somaPontos * 100) : 0;
      }

      // % do público que respondeu igual a essa pessoa
      function pctIgual(coluna) {
        var iguais = todas.filter(function (t) {
          return t[coluna] === eu[coluna];
        }).length;
        return Math.round(iguais / todas.length * 100);
      }

      // em quantas das 5 perguntas a resposta dela é a mais comum do público
      var coincidencias = 0;
      ["p1", "p2", "p3", "p4", "p5"].forEach(function (coluna) {
        var contagem = {};
        todas.forEach(function (t) {
          contagem[t[coluna]] = (contagem[t[coluna]] || 0) + 1;
        });
        var maior = Math.max.apply(null, Object.values(contagem));
        if (contagem[eu[coluna]] === maior) {
          coincidencias++;
        }
      });

      // quantas pessoas tiveram o mesmo resultado (contando ela)
      var mesmoPerfil = todas.filter(function (t) {
        return t.artista_resultado === eu.artista_resultado;
      }).length;

      res.json({
        artista: eu.artista_resultado,
        afinidade: afinidade,
        respostas: { importa: eu.p3, momento: eu.p5, plataforma: eu.plataforma },
        publicoIgual: { importa: pctIgual("p3"), momento: pctIgual("p5"), plataforma: pctIgual("plataforma") },
        mesmoPerfil: mesmoPerfil,
        coincidencias: coincidencias
      });
    })
    .catch(function (erro) {
      console.log(erro);
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = { resumo, individual };