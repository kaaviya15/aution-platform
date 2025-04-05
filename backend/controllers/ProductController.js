const Product=require('../models/Products')

const regProduct = async (req,res)=>{

try{
    let { name, description ,cost,start_time,end_time }=req.body;
     
    console.log(req.files);
    const image=req.files.image;
    const imagePath="uploads/"+image.name;
    await image.mv(imagePath);

    if(!name || !description || !image || !cost || !start_time || !end_time){
        return res.status(400).json({message:"All fields are required"});
    }
    name=name.toLowerCase();
    description=description.toLowerCase();
    cost=Number(cost);
   
   

    if(isNaN(cost)){
        return res.status(400).json({message:"cost must be vaild number"});
    }

    const newProduct=await Product.create({
         name,
         description,
         image:imagePath,
         cost,
         start_time,
         end_time,
    });

    return res.status(201).json({
        message:"successfully created",
        product:{
            id:newProduct.id, 
            name:newProduct.name,
            description:newProduct.description,
            cost:newProduct.cost,
            start_time:newProduct.start_time,
            end_time:newProduct.end_time,
            image:newProduct.image,
        }
    });
}
catch(e){
 return res.status(500).json({
    message:"server error",
    error:e.message
 });
}
};


const getAllProduct=async(req,res)=>{
      

    try{
        
       const products=await Product.find();
       res.status(200).json(products);

    }catch(err){
        res.status(500).json({
            message:"server error",
            error:err.message
        });
    }


};

const getById=async(req,res)=>{

    const {id}=req.params;

    try{
  
        const productById=await Product.findById(id);       
        
        if(!productById){
            return res.status(404).json({message:"Product not found"});
        }

        return res.status(200).json(productById);
    }
    catch(err){
        return res.status(500).json({
            message:"Internal Server error",
            error:err.message,
        })
    }
};

const deleteById=async(req,res)=>{

   const{id}=req.params;

    try{
        const deleteProduct=await Product.findByIdAndDelete(id);

        if(!deleteProduct){
            return res.status(404).json("Product Not found and Not deleted");
        }
        return res.status(200).json({message:"Product successfully deleted"});
    }catch(err){
        return res.status(500).json({
            message:"Internal server error",
            error:err.message,
        })
    }
};

const updateById=async(req,res)=>{
  const{id}=req.params;
try{
    const updateProduct=await Product.findByIdAndUpdate(id);
    if(!updateProduct){
        return res.status(404).json({
            message:"Product not found",
        })
    }
    return res.status(200).json({message:"product updated successfully"});
}
catch(err){
    return res.status(500).json({
        message:"Internal server error",
        error:err.message,
    })
}
};



module.exports={regProduct,getAllProduct,getById,deleteById,updateById};