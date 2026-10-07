import "dotenv/config";
console.log("DATABASE USED BY APP:", process.env.DATABASE_URL);

import express from "express";
import cors from "cors";
import { PrismaClient } from "./generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
   connectionString: process.env.DATABASE_URL!,
});

const app = express();
const prisma = new PrismaClient({ adapter });

app.use(express.json())
app.use(cors())

app.get("/api/notes", async (req, res)=> {
    const notes = await prisma.note.findMany();

    res.json(notes);
});

app.listen(5000, ()=> {
    console.log("server running on localhost:5000")
});