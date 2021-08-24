const router = require("express").Router();
var leaves = require('../controller/leaves.controller');
// dashboard route
// router.get(leaves.index);
router.route('/')
    .get(leaves.indexx)
// router.get("/", (req, res) => {
//   res.json({
//     error: null,
//     data: {
//       title: "My dashboard",
//       content: "dashboard content",
//       user: req.user,
//     },
//   });
// });

module.exports = router;
