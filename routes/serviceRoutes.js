const express = require("express")
const { addService, getAllService,getService,updateService, verifyService, getMyService } = require("../controllers/serviceController")
const authMiddleware = require("../middlewares/authMiddleware")

const router = express.Router()

router.post("/",authMiddleware, addService);
router.get("/get-services",authMiddleware, getAllService)
router.get("/get-service",authMiddleware, getService)
router.patch("/update-service",authMiddleware, updateService)
router.post("/verify",authMiddleware,verifyService);
router.get("/my-service",authMiddleware,getMyService)


module.exports = router;