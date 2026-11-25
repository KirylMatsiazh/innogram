import express, { type Express } from 'express';
import { errorMiddleware } from './middleware/error.middleware.js';
import cookieParser from 'cookie-parser';
import { connectRedis } from './config/redis.js';
import { authRouter } from './routes/auth.routes.js';

const app: Express = express();
app.use(express.json());    //for parsing json from body

app.use(cookieParser());

await connectRedis();

app.use('/auth', authRouter);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Auth service listening on port ${PORT}`);
});
