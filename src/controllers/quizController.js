var quizModel = require("../models/quizModel");

var ARTISTAS = ["Matuê", "Teto", "Brandão", "Wiu"];

function salvar(req, res) {
  var artista = req.body.artista;
  var respostas = req.body.respostas;
  var pontos = req.body.pontos || {};

  if (!ARTISTAS.includes(artista) || !Array.isArray(respostas) || respostas.length != 8) {
    res.status(400).send("Dados inválidos");
  } else {
    // tira aspas para não quebrar o SQL
    var limpas = respostas.map(function (t) {
      return String(t).replace(/['"\\]/g, "");
    });

    // garante que os pontos são números inteiros
    var pontosLimpos = {
      matue: parseInt(pontos["Matuê"]) || 0,
      teto: parseInt(pontos["Teto"]) || 0,
      brandao: parseInt(pontos["Brandão"]) || 0,
      wiu: parseInt(pontos["Wiu"]) || 0
    };

    // se a pessoa já estava logada, vem o id dela; senão fica vazio
    var usuarioId = parseInt(req.body.usuarioId);
    if (isNaN(usuarioId)) {
      usuarioId = null;
    }

    quizModel.salvar(artista, limpas, pontosLimpos, usuarioId)
      .then(function (resultado) {
        res.status(201).json({ id: resultado.insertId });
      })
      .catch(function (erro) {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function vincular(req, res) {
  var idResposta = parseInt(req.body.idResposta);
  var usuarioId = parseInt(req.body.usuarioId);

  if (isNaN(idResposta) || isNaN(usuarioId)) {
    res.status(400).send("Dados inválidos");
  } else {
    quizModel.vincular(idResposta, usuarioId)
      .then(function () {
        res.status(200).send("Vinculado");
      })
      .catch(function (erro) {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
      });
  }
}

module.exports = { salvar, vincular };