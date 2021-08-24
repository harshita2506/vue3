const router = require("express").Router();
var reportListController = require('../controller/reportController');

router.route('/')
    .get(reportListController.indexx)

module.exports = router;

