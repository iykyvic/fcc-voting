'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var pollSchema = new Schema({
  title: { type: String, required: true, match: [/.{5,255}/, 'title must be greater than 5 characters'] },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'author id required'] },
  status: {
    type: String,
    required: [true, 'status must be \'DRAFT\', \'PUBLISHED\''],
    enum: ['DRAFT', 'PUBLISHED'],
    default: 'DRAFT'
  },
  date: { type: Date, default: Date.now, required: true },
  stats: {
    votes: { type: Number, required: true, default: 0 },
    favs: { type: String, required: true, default: 0 },
    views: { type: Number, required: true, default: 0 }
  },
  options: [{ type: Schema.Types.ObjectId, ref: 'Option' }]
});

var Poll = _mongoose2.default.model('Poll', pollSchema);

exports.default = Poll;