import express from 'express';
import routes from './routes/route';
import { errorMiddleware } from './middlewares/errorMiddleware';

const PORT = 3000

const app = express();
app.use(express.json())

app.use(routes)
app.use(errorMiddleware)

app.listen(PORT, () => console.log(`RUNNING PORT ${PORT}`));