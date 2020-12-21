const express = require("express")
const router = express.Router()
const ctrl = require("../controllers")
const authRequired = require("../middleware/authRequired")

router.get("/", authRequired, ctrl.profile.show)
router.get("/edit", authRequired, ctrl.profile.edit)
router.put("/edit", authRequired, ctrl.profile.update)
router.delete("/:songId", authRequired, ctrl.profile.songDelete)

module.exports = router
