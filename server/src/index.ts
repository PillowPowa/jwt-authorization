import 'dotenv/config';
import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import {connect} from 'mongoose';

import * as routes from './routes/index';

const app = express();

app.use(cookieParser());
app.use(cors());
app.use(express.json());

const start = async () => {
  await connect(process.env.MONGO_URL);
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Listening on PORT: ${process.env.PORT || 5000}`);
  });
};

app.use('/api', routes.authorizationRouter);

start();
