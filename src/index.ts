import express from 'express';
import MongoDb from './modules/db';
import ScheduleRoute from './routes/scheduleRoute';

const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

new MongoDb();

app.use('/schedule', ScheduleRoute);
app.listen(port, () => {
  console.log(`Server http://localhost:${port} running`);
});
