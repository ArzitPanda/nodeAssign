import express from "express";
import multer from "multer";
import mongoose from "mongoose";
import {v4 as uuidv4} from 'uuid';
// import user from "../models/User.js";
import User from '../models/User.js';
import {Videos} from '../models/Video.js';
const router =express.Router();

const DIR = './public/';

const vidstorage = multer.diskStorage({
    
    destination:(req,file,cb)=>{cb(null,DIR)}, 

    filename:(req,file,cb)=>{
            const filename= file.originalname.toLowerCase().split(" ").join("-");
            cb(null,uuidv4()+filename);



    }


});


var upload = multer({
        storage:vidstorage,

        // onFileUploadStart:function (file) {
        //     console.log(file.originalname+"...starting...");
        // },
        fileFilter:(req,file,cb)=>{

                if(file.mimetype== "video/mp4" || file.mimetype== "video/x-msvideo")
                {       console.log("uploading")
                    cb(null,true);
                }
               
                else
                {
                    cb(null,false);
                    return cb(new Error("only videos allowed"))
                }



        }



})


router.post("/uploadVid/:id/:title",upload.single('userVideo'),(req,res)=>{
        const url= req.protocol + '://'+ req.get('host');
                
// const data=uuidv4();
console.log("id is"+req.params['id']);
        // User.findByIdAndUpdate(req.params['id'],{$push:{videos:{link:url+"/public/"+req.file.filename,id:uuidv4()}}})
        // .then(result=>{console.log(result);
        // console.log("updated")})
        // .catch(err=>{console.log(err)})

const videos  = new Videos({
        link:url+"/public/"+req.file.filename,
        user:req.params['id'],
        title:req.params['title']



})
videos.save().then(result=>{console.log(result);res.send(result)}).catch(err=>console.log(err));
console.log(videos._id);
User.findByIdAndUpdate(req.params['id'],{$push:{videos:videos._id}}).then(result=>{console.log(result)}).catch(err=>console.log(err));



console.log(req.file)




})


router.post("/likes",(req,res)=>{

        const {id,uid}=req.body;
        console.log(id);
        console.log(uid);
        Videos.findByIdAndUpdate(id,{$addToSet:{likes:uid}}).then(result=>{console.log(result);res.send(result)}).catch(err=>console.log(err));
        
} )



router.get("/getdata",(req,res)=>{
        Videos.find().populate("user").sort({created_at: 1}).then(result=>{console.log(result);res.send(result)}).catch(err=>console.log(err));


})
router.post("/deleteVid",(req,res)=>{
                Videos.findByIdAndDelete(req.body.id).then(result=>{console.log(result);res.send(result)}).catch(err=>console.log(err));


})
router.put("/updateVid",(req,res)=>{
        Videos.findByIdAndUpdate(req.body.id,{$set:{title:req.body.title}}).then(result=>{console.log(result);res.send(result)}).catch(err=>console.log(err));  
})

export default router;