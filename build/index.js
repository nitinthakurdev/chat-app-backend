import express from 'express';
import { Start } from './server';
function Initlization() {
    const app = express();
    Start(app);
}
Initlization();
