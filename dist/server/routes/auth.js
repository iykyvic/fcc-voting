'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _passport = require('../middlewares/passport');

var _passport2 = _interopRequireDefault(_passport);

var _auth = require('../controllers/auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var auth = _express2.default.Router();

auth.get('/facebook', _passport2.default.authenticate('facebook')).get('/facebook/callback', _passport2.default.authenticate('facebook', {
  failureRedirect: '/?error=true'
}), _auth.generateJwt);

exports.default = auth;