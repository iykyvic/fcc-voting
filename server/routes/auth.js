import express from 'express';
import Auth   from '../controllers/auth';

const auth = express.Router();

auth.post('/login', Auth.login)
.post('/logout', Auth.logout);

export default auth;
