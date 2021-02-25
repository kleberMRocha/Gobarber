import 'reflect-metadata';
import 'dotenv/config';
import express, { response } from 'express';
import route from './routes/index';
import {errors} from 'celebrate';
import upload from '../../../config/upload';
import cors from 'cors';
import rateLimiter from './midwares/rateLimiter';
import '../typeorm';
import '../../../shared/container';


const app = express();

app.use(rateLimiter);
app.use(cors());
app.use(express.json());
app.use('/files',express.static(upload.tmpFolder));
app.use(route);
app.use(errors());

app.listen('3333', () => console.log('🔥️ app listen on port 3333'));
