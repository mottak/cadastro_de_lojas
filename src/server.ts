import express from 'express';
import { PrismaClient } from '@prisma/client'

const PORT = 3000

const prisma = new PrismaClient()
const app = express();
app.use(express.json())

app.listen(PORT, ()=> console.log(`RUNNING PORT ${PORT}`));