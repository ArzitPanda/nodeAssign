import express from 'express';
import mongoose from "mongoose";
import User from "../models/User.js"

const auth= express.Router();

auth.post("/create",(req,res)=>{
        const {uid,userName,profileImg}=req.body;
       
        User.exists({uid:uid},(err,result)=>{
                if(err){
                        console.log(err);
                }
                else{
                        if(result){
                                
                                console.log("user already exists");
                                res.send({...result,code:1});     

                        }

                        else{
                                const user = new User({
                                        uid:uid,
                                        userName:userName,
                                        profileImg:profileImg
                                })
                                user.save().then(result=>{console.log(result);res.send({...result,code:0})}).catch(err=>console.log(err));
                        }       
                }
        })
})

         



// auth.post("/",(req,res)=>{
// User.findOne({userName:req.body.userName,passWord:req.body.passWord}).then(result=>{console.log(result);res.send(result)}).catch(err=>console.log(err));



// })

auth.get("/:id",(req,res)=>{

User.findByI(req.params.id).populate('videos').then(result=>{console.log(result);res.send(result)}).catch(err=>console.log(err));


}
)



export default auth;


