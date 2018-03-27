import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const optionSchema = new Schema({
  title: { type: String, required: true, match: /.{5,255}/ },
  poll: { type: Schema.Types.ObjectId, ref: 'Poll', required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: [
    true, 'author id required'
  ] },
  date: { type: Date, default: Date.now, required: true },
  timesChosen: { type: Number, required: true, default: 1 }
});

const Option = mongoose.model('Option', optionSchema);

export default Option;
