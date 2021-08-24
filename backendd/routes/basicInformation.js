const router = require("express").Router();
var informationController = require('../controller/reportController');

router.route('/')
    .get(informationController.index1)

module.exports = router;
