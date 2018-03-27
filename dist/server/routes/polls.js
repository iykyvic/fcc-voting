'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _polls = require('../controllers/polls');

var _auth = require('../controllers/auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var polls = _express2.default.Router();

polls.get('/view', _polls.findPolls).use(_auth.verifyToken).get('/:id', _polls.findPoll).post('/create', _polls.createPoll).post('/:id/update', _polls.updatePoll).delete('/:id/delete', _polls.deletePoll);

exports.default = polls;