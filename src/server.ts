import express from 'express';
import 'express-async-errors'
import routes from './routes/route';
import { errorMiddleware } from './middlewares/errorMiddleware';
import swaggerUi from 'swagger-ui-express';
import swaggerOptions from './swagger/swaggerOptions.json';

const PORT = 3000

const app = express();
app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOptions));

app.use(routes)
app.use(errorMiddleware)

app.listen(PORT, () => console.log(`RUNNING PORT ${PORT}`));