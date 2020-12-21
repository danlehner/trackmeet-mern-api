const express = require("express")
const router = express.Router()
const ctrl = require("../controllers")
const authRequired = require("../middleware/authRequired")

router.get("/", authRequired, ctrl.search.show)
router.post("/", authRequired, ctrl.search.post)

module.exports = router
