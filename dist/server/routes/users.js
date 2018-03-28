'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _user = require('../controllers/user');

var _auth = require('../controllers/auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var users = _express2.default.Router();

users.use(_auth.verifyToken).get('/view/current', _user.fetchCurrentUser);

exports.default = users;