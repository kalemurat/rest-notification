import express from 'express';
import MongoDb from './modules/db';
import CronsRoute from './routes/cronsRoute';

process.env.TZ = 'Europe/Istanbul';

const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

new MongoDb();

app.use('/crons', CronsRoute);
app.listen(port, () => {
  console.log(`Server http://localhost:${port} running`);
});
