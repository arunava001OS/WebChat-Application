import express from express;
import authRouter from './routes/authRoutes.js';
import dotenv from dotenv;

dotenv.config();

const PORT = ProcessingInstruction.enc.PORT || 3000;

const server = express();

//server.use(express.json());

server.use('/api/v1/auth', authRouter);

server.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
  });