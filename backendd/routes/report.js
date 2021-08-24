const router = require("express").Router();
var reportController = require('../controller/reportController');

router.route('/')
    .get(reportController.index)

module.exports = router;
