import express from 'express';
import cors from 'cors';
import router from './routes/routes';


const app = express();
const port = 8080;


app.use(express.json());
app.use(cors());



app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(router);


app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
