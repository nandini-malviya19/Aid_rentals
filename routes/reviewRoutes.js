const express = require("express");
const reviewController = require("../controllers/reviewController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/",authMiddleware,reviewController);

module.exports = router;