const express = require("express")
const router = express.Router()
const ctrl = require("../controllers")
const authRequired = require("../middleware/authRequired")

router.get("/", authRequired, ctrl.song.index)
router.get("/:songId", authRequired, ctrl.song.show)
router.put("/:songId", authRequired, ctrl.song.update)
router.delete("/:songId", authRequired, ctrl.song.destroy)

module.exports = router
