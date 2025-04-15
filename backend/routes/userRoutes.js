const express=require('express');
const router=express.Router();
const {registerUser,loginUser}=require('../controllers/userController');
const {bidSet}=require('../controllers/BidsConroller');



const {regProduct,getAllProduct,getById,deleteById, updateById,getSellerProducts}=require("../controllers/ProductController");
const {hotsaleProduct}=require('../controllers/HotSaleController');
const {authMiddleware}=require('../middleware/authMiddleware');


const validateUserInput=require('../middleware/validateUserInput');
router.post("/register",validateUserInput,registerUser);
router.post("/login",validateUserInput,loginUser);


router.post("/addProduct",authMiddleware,regProduct);
router.get("/getProducts",getAllProduct);
router.get("/getById/:id",getById);
router.delete("/deleteById/:id",deleteById);
router.put("/updateById/:id",updateById)
router.get("/get_hotSales",hotsaleProduct);
router.get("/my-products",authMiddleware,getSellerProducts);

router.get("/getAllBids/:id",bidSet);

module.exports=router;