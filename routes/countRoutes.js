const express = require("express");
const countController = require("../controllers/countController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/",authMiddleware,countController);

module.exports = router;