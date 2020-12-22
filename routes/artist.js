const express = require("express")
const router = express.Router()
const ctrl = require("../controllers")
const authRequired = require("../middleware/authRequired")

router.get("/", authRequired, ctrl.artist.index)
router.get("/:artistId", authRequired, ctrl.artist.show)

module.exports = router
