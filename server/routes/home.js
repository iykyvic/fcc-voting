import express from 'express';
import Home    from '../controllers/home';

const home = express.Router();

home.get('*', Home);

export default home;

