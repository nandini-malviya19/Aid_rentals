const express = require("express");
const { register, login, currentUserController } = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// REGISTER|| POST
router.post("/register", register);

// LOGIN || LOGIN

router.post("/login", login);

//GET CURRENT USER

router.get("/current-user",authMiddleware, currentUserController);

module.exports = router;