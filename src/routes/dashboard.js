var express = require("express");
var router = express.Router();
var dashboardController = require("../controllers/dashboardController");

router.get("/resumo", function (req, res) {
  dashboardController.resumo(req, res);
});

module.exports = router;