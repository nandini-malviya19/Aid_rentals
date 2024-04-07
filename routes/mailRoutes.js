const express = require("express");
const router=express.Router()
const authMiddleware = require("../middlewares/authMiddleware");
const mailController=require("../controllers/mailController")

//MAILING
router.post("/",authMiddleware,mailController);

module.exports = router;