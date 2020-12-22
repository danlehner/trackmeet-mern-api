const express = require("express")
const router = express.Router()
const ctrl = require("../controllers")
const authRequired = require("../middleware/authRequired")

router.get("/", authRequired, ctrl.genre.index)
router.get("/:genreId", authRequired, ctrl.genre.show)

module.exports = router
