import express, { type Application } from "express";
import { Start } from "@/server";

function Initlization() {
    const app: Application = express();
    Start(app)
}

Initlization()