import express from 'express';
import { findRiskScore, insertData, registerUser } from '../controller';

 export const appRouter:express.Router = express.Router();

appRouter.get('/:riskScore', findRiskScore);
appRouter.post('/register', registerUser);
//appRouter.get('/insertdata', insertData);