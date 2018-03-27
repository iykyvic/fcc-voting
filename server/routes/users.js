import express from 'express';
import { fetchCurrentUser } from '../controllers/user';
import { verifyToken } from '../controllers/auth';

const users = express.Router();

users
  .use(verifyToken)
  .get('/view/current', fetchCurrentUser)

export default users;
