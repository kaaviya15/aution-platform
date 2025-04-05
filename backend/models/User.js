const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { 
        type: String,  
        enum: ["buyer", "seller"],
        required: true
    }
}, { timestamps: true });


const User = mongoose.model("User", userSchema);
module.exports = User;
