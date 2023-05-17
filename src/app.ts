import express from 'express';
import cors from 'cors';
import router from './routes/routes';
import { PrismaClient } from '@prisma/client';

const app = express();
const port = 8080;

const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(router);

prisma.$connect()
  .then(() => {
    app.listen(port, () => {
      console.log('Prisma database is ready!');
      console.log(`Listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to Prisma database:', error);
  });

