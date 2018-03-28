import express from 'express';
import routeValidator from 'express-route-validator';
import {
  createOption,
  findOptions,
  updatePollOption,
  deletePollOption,
  updatePollOptionStat
} from '../controllers/options';
import { verifyToken } from '../controllers/auth';

const options = express.Router();

options.get('/view', findOptions)
  .post('/:id/updatestat', updatePollOptionStat)
  .use(verifyToken)
  // .get('/view/:id', findPoll)
  .post('/create', routeValidator.validate({
    body: {
      title: { isRequired: true, isAscii: true },
      poll: { isRequired: true }
    }
  }), createOption)
  .post('/:id/update', updatePollOption)
  .delete('/:id/delete/', deletePollOption);

export default options;
