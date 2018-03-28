'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var voteSchema = new Schema({
  finger: { type: String, required: true },
  poll: { type: Schema.Types.ObjectId, ref: 'Poll', required: true }
});

var Vote = _mongoose2.default.model('Vote', voteSchema);

exports.default = Vote;