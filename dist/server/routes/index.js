'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _home = require('./home');

var _home2 = _interopRequireDefault(_home);

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

var _polls = require('./polls');

var _polls2 = _interopRequireDefault(_polls);

var _users = require('./users');

var _users2 = _interopRequireDefault(_users);

var _options = require('./options');

var _options2 = _interopRequireDefault(_options);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  home: _home2.default,
  auth: _auth2.default,
  polls: _polls2.default,
  users: _users2.default,
  options: _options2.default
};