'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deletePollOption = exports.updatePollOptionStat = exports.updatePollOption = exports.findOptions = exports.createOption = undefined;

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var createOption = exports.createOption = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res) {
    var _id, body, _req$body$poll, pollId, authorId, option, updatedPoll;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _id = req.decoded._id, body = req.body, _req$body$poll = req.body.poll, pollId = _req$body$poll._id, authorId = _req$body$poll.author._id;


            body.author = authorId;

            (0, _auth.ownsPoll)(authorId, _id);

            _context.next = 6;
            return _index.Option.create(body);

          case 6:
            option = _context.sent;
            _context.next = 9;
            return _index.Poll.findByIdAndUpdate(pollId, {
              $push: { options: option._id }
            }, { new: true }).populate('author', '_id displayName').populate('options');

          case 9:
            updatedPoll = _context.sent;
            return _context.abrupt('return', (0, _polls.showSuccess)(res, 201, [option, updatedPoll]));

          case 13:
            _context.prev = 13;
            _context.t0 = _context['catch'](0);
            return _context.abrupt('return', (0, _polls.showError)(_context.t0, res));

          case 16:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 13]]);
  }));

  return function createOption(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var findOptions = exports.findOptions = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res) {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function findOptions(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * Update Poll Option
 *
 * @export
 * @param {Object} req request
 * @param {Object} res response
 * @returns {Object} updated option instance
 */


var updatePollOption = exports.updatePollOption = function () {
  var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(req, res) {
    var body, author, id, _id, authorId, date, timesChosen, optionId, rest, option;

    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            body = req.body, author = req.body.author, id = req.params.id, _id = req.decoded._id;

            (0, _auth.ownsPoll)(author, _id);
            authorId = body.author, date = body.date, timesChosen = body.timesChosen, optionId = body._id, rest = (0, _objectWithoutProperties3.default)(body, ['author', 'date', 'timesChosen', '_id']);
            _context3.next = 6;
            return _index.Option.findByIdAndUpdate(id, rest, { new: true });

          case 6:
            option = _context3.sent;
            return _context3.abrupt('return', (0, _polls.showSuccess)(res, 200, option));

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3['catch'](0);
            return _context3.abrupt('return', (0, _polls.showError)(_context3.t0, res));

          case 13:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this, [[0, 10]]);
  }));

  return function updatePollOption(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * Update Poll Option
 *
 * @export
 * @param {Object} req request
 * @param {Object} res response
 * @returns {Object} updated option instance
 */


var updatePollOptionStat = exports.updatePollOptionStat = function () {
  var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(req, res) {
    var finger, id, option, poll, vote, savedOption;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            finger = req.body.finger, id = req.params.id;
            _context4.next = 4;
            return _index.Option.findOne({ _id: id });

          case 4:
            option = _context4.sent;
            _context4.next = 7;
            return _index.Poll.findById(option.poll);

          case 7:
            poll = _context4.sent;

            if (!(poll.status !== 'PUBLISHED')) {
              _context4.next = 10;
              break;
            }

            throw new Error('poll is currently closed.');

          case 10:
            _context4.next = 12;
            return _index.Vote.findOne({ poll: poll._id, finger: finger });

          case 12:
            vote = _context4.sent;

            if (!vote) {
              _context4.next = 15;
              break;
            }

            throw new Error('you have already voted');

          case 15:
            _context4.next = 17;
            return _index.Vote.create({ poll: poll._id, finger: finger });

          case 17:

            option.timesChosen += 1;
            _context4.next = 20;
            return option.save();

          case 20:
            savedOption = _context4.sent;
            return _context4.abrupt('return', (0, _polls.showSuccess)(res, 200, savedOption));

          case 24:
            _context4.prev = 24;
            _context4.t0 = _context4['catch'](0);
            return _context4.abrupt('return', (0, _polls.showError)(_context4.t0, res));

          case 27:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this, [[0, 24]]);
  }));

  return function updatePollOptionStat(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

/**
 * Delete Poll Option
 *
 * @export
 * @param {Object} req request
 * @param {Object} res response
 * @returns {Object} updated option instance
 */


var deletePollOption = exports.deletePollOption = function () {
  var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(req, res) {
    var body, _req$body, author, poll, optionId, id, _id, option;

    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            body = req.body, _req$body = req.body, author = _req$body.author, poll = _req$body.poll, optionId = _req$body._id, id = req.params.id, _id = req.decoded._id;

            (0, _auth.ownsPoll)(author, _id);

            _context5.next = 5;
            return _index.Poll.findByIdAndUpdate(poll, {
              '$pull': { options: optionId }
            }, { safe: true });

          case 5:
            _context5.next = 7;
            return _index.Option.deleteOne({ _id: optionId });

          case 7:
            option = _context5.sent;
            return _context5.abrupt('return', (0, _polls.showSuccess)(res, 200, option));

          case 11:
            _context5.prev = 11;
            _context5.t0 = _context5['catch'](0);
            return _context5.abrupt('return', (0, _polls.showError)(_context5.t0, res));

          case 14:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this, [[0, 11]]);
  }));

  return function deletePollOption(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

var _index = require('../models/index');

var _polls = require('./polls');

var _auth = require('./auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }