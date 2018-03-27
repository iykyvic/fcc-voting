import dotenv    from 'dotenv';
import bluebird  from 'bluebird';
import mongoose  from 'mongoose';
import Polls     from './Polls';
import Users     from './Users';
import Options from './Options';

dotenv.config();
mongoose.Promise = bluebird;
mongoose.connect(process.env.DB_URL, { useMongoClient: true });

export const database = mongoose.connection;
export const Poll = Polls;
export const User = Users;
export const Option = Options;
