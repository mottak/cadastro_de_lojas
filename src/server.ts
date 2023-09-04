import express from 'express';
import { PrismaClient } from '@prisma/client'
import routes from './routes/route';

const PORT = 3000

const prisma = new PrismaClient()
const app = express();
app.use(express.json())

app.use(routes)

app.listen(PORT, () => console.log(`RUNNING PORT ${PORT}`));