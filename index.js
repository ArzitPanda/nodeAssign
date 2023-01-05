import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./router/upload.js"
import auth from "./router/auth.js"


mongoose.connect("mongodb+srv://arzit:Panda2001@cluster0.oov11.mongodb.net/?retryWrites=true&w=majority")
.then((data)=>{console.log("connected to db")})
.catch((err=>{console.log("error: " + err)}))



const app = express();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/public', express.static('public'));
app.use("/api",router);
app.use("/auth",auth);


app.get("/",(req,res)=>{res.send("hello from server")});
app.listen(5000,()=>{console.log("hello-world")});