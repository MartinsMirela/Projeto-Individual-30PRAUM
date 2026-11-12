var quizModel = require("../models/quizModel");

var ARTISTAS = ["Matuê", "Teto", "Brandão", "Wiu"];

function salvar(req, res) {
  var artista = req.body.artista;
  var respostas = req.body.respostas;

  // confere se os dados chegaram certos
  if (!ARTISTAS.includes(artista) || !Array.isArray(respostas) || respostas.length != 8) {
    res.status(400).send("Dados inválidos");
  } else {
    // tira aspas para não quebrar o SQL
    var limpas = respostas.map(function (t) {
      return String(t).replace(/['"\\]/g, "");
    });

    quizModel.salvar(artista, limpas)
      .then(function () {
        res.status(201).send("Salvo");
      })
      .catch(function (erro) {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
      });
  }
}

module.exports = { salvar };