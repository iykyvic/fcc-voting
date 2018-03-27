'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Option = exports.User = exports.Poll = exports.database = undefined;

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _Polls = require('./Polls');

var _Polls2 = _interopRequireDefault(_Polls);

var _Users = require('./Users');

var _Users2 = _interopRequireDefault(_Users);

var _Options = require('./Options');

var _Options2 = _interopRequireDefault(_Options);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();
_mongoose2.default.Promise = _bluebird2.default;
_mongoose2.default.connect(process.env.MONGODB_URI, { useMongoClient: true });

var database = exports.database = _mongoose2.default.connection;
var Poll = exports.Poll = _Polls2.default;
var User = exports.User = _Users2.default;
var Option = exports.Option = _Options2.default;