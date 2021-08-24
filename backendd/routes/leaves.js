const router = require("express").Router();
var leaves = require('../controller/leaves.controller');
router.route('/')
    .get(leaves.index)

module.exports = router;
