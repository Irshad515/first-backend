//require('dotenv').config({path: './.env'});
import 'dotenv/config';
import mongooese from 'mongoose';


import { DB_name } from './constants';
import connectDB from './db';
import { app } from './app';

dotenv.config({
    path: './.env'
});


connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`app is listening on port: ${process.env.PORT}`);
    });
}).catch((error) => {
    console.log('MongoDB connection error:', error);
    process.exit(1);
});
















/*
import express from 'express';
const app = express();


(async()=>{
    try{
       await mongooese.connect(`${process.env.MONGODB_URI}/${DB_name}` )
       app.on('error', (error) => {
        console.error('ERROR:', error);
        throw error;
       })
       app.listen(process.env.PORT, () => {
        console.log(`app is listening on port ${process.env.PORT}`);
       })
    }
    catch(error){
        console.log("ERROR:",error);
        throw error;
    }
    finally{
        mongooese.connection.close();
    }
})()
    */