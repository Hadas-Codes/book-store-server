import express from 'express';
import apiRouter from './routes/index.route.js';
import logger from './middlewares/logger.js';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import currentDate from './middlewares/currentDate.js';
import logGetRequests from './middlewares/logGetRequests.js';

const app = express();
const PORT = 5000;
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,  
    limit: 100, 
});

app.use('/api', apiRouter);
app.use(helmet()); 
app.use(cors()); 
app.use(morgan('development')); 
app.use(limiter);
app.use(express.json());
app.use(logger);
app.use(currentDate);
app.use(logGetRequests);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});