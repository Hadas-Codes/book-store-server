import express from 'express';
import apiRouter from './routes/index.route.js';
const app = express();
const PORT = 5000;

app.use(express.json());

app.use('/api', apiRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});