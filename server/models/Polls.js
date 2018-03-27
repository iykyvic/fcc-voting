import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const pollSchema = new Schema({
  title: { type: String, required: true, match: [
    /.{5,255}/,
    'title must be greater than 5 characters'
  ] },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: [
    true, 'author id required'
  ] },
  status: {
    type: String,
    required: [true, `status must be 'DRAFT', 'PUBLISHED'`],
    enum : ['DRAFT', 'PUBLISHED'],
    default: 'DRAFT'
  },
  date: { type: Date, default: Date.now, required: true },
  stats: {
    votes: { type: Number, required: true, default: 0 },
    favs: { type: String, required: true, default: 0 },
    views: { type: Number, required: true, default: 0 },
  },
  options: [{ type: Schema.Types.ObjectId, ref: 'Option' }]
});

const Poll = mongoose.model('Poll', pollSchema);

export default Poll;
