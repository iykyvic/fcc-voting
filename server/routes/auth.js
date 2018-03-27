import express from 'express';
import passport from '../middlewares/passport';
import { generateJwt } from '../controllers/auth';

const auth = express.Router();

auth.get('/facebook', passport.authenticate('facebook'))
  .get('/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: '/?error=true'
  }), generateJwt);

export default auth;
