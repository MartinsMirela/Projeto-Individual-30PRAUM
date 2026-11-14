var express = require("express");
var router = express.Router();
var dashboardController = require("../controllers/dashboardController");

router.get("/resumo", function (req, res) {
  dashboardController.resumo(req, res);
});

router.get("/individual/:usuarioId", function (req, res) {
  dashboardController.individual(req, res);
});

module.exports = router;