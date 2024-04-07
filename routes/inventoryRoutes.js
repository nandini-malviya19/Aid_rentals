const express = require("express");
const { inventoryController, getAllInventory,getInventory, getRandom, getUserInventory,setRent } = require("../controllers/inventorController");

const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();


// ADD||POST || PROTECTED 
router.post("/add", authMiddleware, inventoryController);
// RETRIVE || GET || PROTECTED
router.get("/get", authMiddleware, getAllInventory);

router.get("/get-inventory", authMiddleware, getInventory);
router.get("/get-random", authMiddleware,getRandom);

router.get("/get-user-inv", authMiddleware,getUserInventory)
router.patch("/set-rent",authMiddleware,setRent);

module.exports = router;