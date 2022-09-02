const mongoose = require('mongoose');
const userSchema  = require('../model/model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const createData = async(req,res)=>{
    const hashPass  = await bcrypt.hash(req.body.password,7)
    const userData = new userSchema({
        ...req.body,password:hashPass
    })
    const existEmail = await userSchema.findOne({email:req.body.email})
    if(existEmail) return res.json("Email Already registered")
    const saveData = await userData.save();
    res.json(saveData)

}
const logIn = async(req,res)=>{
    const userEmail = await userSchema.findOne({email:req.body.email})
    if(!userEmail) return res.json("Email Not Valid")
    const validPass = await bcrypt.compare(req.body.password,userEmail.password)
    if(!validPass) return res.json("Password Not Valid")
    const token = jwt.sign({id:userEmail._id},process.env.TOKENKEY)
    res.cookie("sample_cookie",token,{
        httpOnly:true
    }).status(200).json("Log in successfully");
    
    
}

const updateData = async(req,res)=>{
    if(req.params.id === req.data.id){
        const upDate = await userSchema.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true})
        res.json({msg:"Updated successfully",
    data:upDate})
    }
    else{
        res.json("You are wrong person")
    }
}
module.exports={createData,logIn,updateData}