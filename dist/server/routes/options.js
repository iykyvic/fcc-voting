'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressRouteValidator = require('express-route-validator');

var _expressRouteValidator2 = _interopRequireDefault(_expressRouteValidator);

var _options = require('../controllers/options');

var _auth = require('../controllers/auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var options = _express2.default.Router();

options.get('/view', _options.findOptions).use(_auth.verifyToken)
// .get('/view/:id', findPoll)
.post('/create', _expressRouteValidator2.default.validate({
  body: {
    title: { isRequired: true, isAscii: true },
    poll: { isRequired: true }
  }
}), _options.createOption).post('/:id/update', _options.updatePollOption).post('/:id/updatestat', _options.updatePollOptionStat).delete('/:id/delete/', _options.deletePollOption);

exports.default = options;