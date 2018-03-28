'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _passportFacebook = require('passport-facebook');

var _passportFacebook2 = _interopRequireDefault(_passportFacebook);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _models = require('../models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _process$env = process.env,
    FACEBOOK_APP_ID = _process$env.FACEBOOK_APP_ID,
    FACEBOOK_APP_SECRET = _process$env.FACEBOOK_APP_SECRET,
    HOST_NAME = _process$env.HOST_NAME;


_passport2.default.use(new _passportFacebook2.default({
  callbackURL: HOST_NAME + '/api/v1/auth/facebook/callback',
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  profileFields: ['id', 'displayName', 'photos', 'email'],
  scope: ['email', 'user_about_me'],
  session: false
}, function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _args$slice, _args$slice2, data, cb, id, _ref2, user;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _args$slice = args.slice(2), _args$slice2 = (0, _slicedToArray3.default)(_args$slice, 2), data = _args$slice2[0], cb = _args$slice2[1];
            _context.prev = 1;
            id = data.id;
            _context.next = 5;
            return _models.User.findOrCreate({ id: id }, data);

          case 5:
            _ref2 = _context.sent;
            user = _ref2.doc;
            return _context.abrupt('return', cb(null, user));

          case 10:
            _context.prev = 10;
            _context.t0 = _context['catch'](1);
            return _context.abrupt('return', cb(_context.t0.message, null));

          case 13:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[1, 10]]);
  }));

  return function () {
    return _ref.apply(this, arguments);
  };
}()));

_passport2.default.serializeUser(function (user, cb) {
  return cb(null, user);
});
_passport2.default.deserializeUser(function (user, cb) {
  return cb(null, user);
});

exports.default = _passport2.default;