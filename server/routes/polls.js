import express from 'express';
import Polls    from '../controllers/polls';

const polls = express.Router();

polls.get('/', Polls.find)
.get('/:id', Polls.findOne)
.post('/', Polls.create)
.patch('/:id', Polls.update)
.delete('/:id', Polls.delete);

export default polls;
