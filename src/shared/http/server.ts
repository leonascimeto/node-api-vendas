import 'reflect-metadata';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import { pagination } from 'typeorm-pagination';
import cors from 'cors';
import { errors } from 'celebrate';
import routes from './routes';
import AppError from '@shared/errors/AppError';
import '@shared/typeorm';
import uploadConfig from '@config/upload';
import rateLimiter from './middlewares/rateLimiter';

const app = express();

app.use(cors());
app.use(express.json());

app.use(rateLimiter);
app.use(pagination);
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);
app.use(errors());

//midleware de rotemaneto de erros
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }

  console.log('flag: ', error);

  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

app.listen(3333, () => console.log('Server starter on http://localhost:3333/'));
