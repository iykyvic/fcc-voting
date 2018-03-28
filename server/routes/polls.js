import express from 'express';
import { findPoll, findPolls, createPoll, updatePoll, deletePoll } from '../controllers/polls';
import { verifyToken } from '../controllers/auth';

const polls = express.Router();

polls.get('/view', findPolls)
  .get('/:id', findPoll)
  .use(verifyToken)
  .post('/create', createPoll)
  .post('/:id/update', updatePoll)
  .delete('/:id/delete', deletePoll);

export default polls;
