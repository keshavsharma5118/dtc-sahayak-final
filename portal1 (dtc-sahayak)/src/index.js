// require('dotenv').config({path:'./env'})

import Dotenv, { configDotenv }  from "dotenv";
// import mongoose, { connect } from "mongoose";
// import {DB_NAME } from "./constants";

import { app  } from "./app.js";
import connectDB from "./db/index.js";





Dotenv.config({
    path:'./env'
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000 , () =>{
        console.log(` Server is running at port : ${process.env.PORT} `);
    })
})
.catch((err)=>{
    console.log("MONGODB CONNECTION FAILED",err);
})





/* FIRST APPROACH

import express from "express";
const app=express()

( async()  =>  {
    try {
       await mongoose.connect(`${process.env.MONOGODB_URI} /${DB_NAME}`)
       app.on("error",()=>{
        console.log("ERROR");
        throw error
       })

app.listen(process.env.PORT,()=>{

    console.log(`APP IS LISTENING ON PORT ${process.env.PORT}`);
})

    }
    
    
    
    catch (error) {
        console.error("ERROR:",error)
        throw err
    }
})()
    */