import express from 'express';
import { findPoll, findPolls, createPoll, updatePoll, deletePoll } from '../controllers/polls';
import { verifyToken } from '../controllers/auth';

const polls = express.Router();

polls.get('/view', findPolls)
  .use(verifyToken)
  .get('/:id', findPoll)
  .post('/create', createPoll)
  .post('/:id/update', updatePoll)
  .delete('/:id/delete', deletePoll);

export default polls;
