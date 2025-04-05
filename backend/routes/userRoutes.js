const express=require('express');
const router=express.Router();
const {registerUser,loginUser}=require('../controllers/userController');

const {regProduct,getAllProduct,getById,deleteById, updateById}=require("../controllers/ProductController");

const validateUserInput=require('../middleware/validateUserInput');
router.post("/register",validateUserInput,registerUser);
router.post("/login",validateUserInput,loginUser);


router.post("/addProduct",regProduct);
router.get("/getProducts",getAllProduct);
router.get("/getById/:id",getById);
router.delete("/deleteById/:id",deleteById);
router.put("/updateById/:id",updateById)

module.exports=router;