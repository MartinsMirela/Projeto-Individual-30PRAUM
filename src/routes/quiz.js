var express = require("express");
var router = express.Router();
var quizController = require("../controllers/quizController");

router.post("/", function (req, res) {
  quizController.salvar(req, res);
});

router.post("/vincular", function (req, res) {
  quizController.vincular(req, res);
});

module.exports = router;