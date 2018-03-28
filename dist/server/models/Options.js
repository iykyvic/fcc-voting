'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var optionSchema = new Schema({
  title: { type: String, required: true, match: /.{5,255}/ },
  poll: { type: Schema.Types.ObjectId, ref: 'Poll', required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'author id required'] },
  date: { type: Date, default: Date.now, required: true },
  timesChosen: { type: Number, required: true, default: 1 }
});

var Option = _mongoose2.default.model('Option', optionSchema);

exports.default = Option;