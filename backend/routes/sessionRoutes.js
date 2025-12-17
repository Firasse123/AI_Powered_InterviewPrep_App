const express=require("express");
const {createSession,getSessionById,getMySessions,deleteSession}=require("../controllers/sessionController");
const {protect}=require("../middlewares/authMiddleware");
const router=express.Router();

router.post("/create",protect,createSession); //Create a new session
router.get("/my-sessions",protect,getMySessions); //Get sessions of logged in user
router.get("/:id",protect,getSessionById); //Get session by ID
router.delete("/:id",protect,deleteSession); //Delete a session


module.exports=router;