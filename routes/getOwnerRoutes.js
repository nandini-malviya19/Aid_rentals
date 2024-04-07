const express = require("express");
const router = express.Router()
const authMiddleware = require("../middlewares/authMiddleware");
const { getOwnerController } = require("../controllers/getOwnerController");



// Post OWNER
router.post("/", authMiddleware, getOwnerController);

module.exports = router;