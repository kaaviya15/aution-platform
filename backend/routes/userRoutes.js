const express=require('express');
const router=express.Router();
const registerUser=require('../controllers/userController')

router.post("/signup",registerUser);
router.post("/login",login);
module.exports=router;