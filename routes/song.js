const express = require("express")
const router = express.Router()
const ctrl = require("../controllers")
const authRequired = require("../middleware/authRequired")

router.get("/", authRequired, ctrl.song.index)
router.get("/:genreId", authRequired, ctrl.song.show)
router.delete("/:genreId", authRequired, ctrl.song.destroy)

module.exports = router
