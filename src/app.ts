import express from 'express';
import { config } from "dotenv";
import cors from 'cors'
import morgan from 'morgan'
import path, { dirname } from 'path';
import { getDBconnection } from './db/dbconnection';
import { appRouter } from './router';


//environment variables
config()

//paths
const publicPath = path.join(__dirname, "public");

//express middleware set-up
export const app:express.Application = express();
app.use(cors());
app.use(express.static(publicPath));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(morgan('combined'))

//db connection
const db = process.env.DB_URL;
if(db) getDBconnection(db);

//router set-up
app.use('/', appRouter)


