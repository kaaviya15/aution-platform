const User=require('../models/User');



const userLogin=async()=>{
     const {email,password,role}=req.body;

     try{

     }
}



const registerUser=async()=>{
     const {email,password,role}=req.body;

     try{

        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"Email is already in use by another user"});
        }
        const hashedPassword= await bcrypt.hash(password,10);
        const newUser=await User.create({email,password : hashedPassword,role});
        res.status(200).json({message:"User register successfully",user:newUser});
     }catch(error){
              res.status(500).json({message:"Server",error:error.message});
     }
    
};

module.exports={registerUser};