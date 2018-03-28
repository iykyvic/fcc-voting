'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deletePoll = exports.findPolls = exports.findPoll = exports.updatePoll = exports.createPoll = exports.showError = exports.showSuccess = undefined;

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

/**
 * Create Poll
 *
 * @export
 * @param {Object} req request
 * @param {Object} res response
 * @returns {Object} poll instance
 */
var createPoll = exports.createPoll = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res) {
    var _id, body, poll;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _id = req.decoded._id, body = req.body;

            body.author = _id;
            _context.next = 5;
            return _index.Poll.create(body);

          case 5:
            poll = _context.sent;
            return _context.abrupt('return', showSuccess(res, 201, poll));

          case 9:
            _context.prev = 9;
            _context.t0 = _context['catch'](0);

            console.log(_context.t0);
            return _context.abrupt('return', showError(_context.t0, res));

          case 13:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 9]]);
  }));

  return function createPoll(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Update Poll
 *
 * @export
 * @param {Object} req request
 * @param {Object} res response
 * @returns {Object} updated poll instance
 */


var updatePoll = exports.updatePoll = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res) {
    var body, id, _id, author, date, stats, pollId, rest, poll;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            body = req.body, id = req.params.id, _id = req.decoded._id;


            (0, _auth.ownsPoll)(body.author._id, _id);
            author = body.author, date = body.date, stats = body.stats, pollId = body._id, rest = (0, _objectWithoutProperties3.default)(body, ['author', 'date', 'stats', '_id']);

            console.log(rest);
            _context2.next = 7;
            return _index.Poll.findByIdAndUpdate(id, rest, { new: true }).populate('author', 'displayName').populate('options');

          case 7:
            poll = _context2.sent;
            return _context2.abrupt('return', showSuccess(res, 200, poll));

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2['catch'](0);
            return _context2.abrupt('return', showError(_context2.t0, res));

          case 14:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[0, 11]]);
  }));

  return function updatePoll(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * Find Poll
 *
 * @export
 * @param {Object} req request
 * @param {Object} res response
 * @param {Function} next the callback
 * @returns {Object}  poll instance
 */


var findPoll = exports.findPoll = function () {
  var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(req, res, next) {
    var poll;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _index.Poll.findById(req.params.id).populate('author').populate('options');

          case 3:
            poll = _context3.sent;
            return _context3.abrupt('return', showSuccess(res, 200, poll));

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3['catch'](0);
            return _context3.abrupt('return', showError(_context3.t0, res));

          case 10:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this, [[0, 7]]);
  }));

  return function findPoll(_x5, _x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * Find Polls
 *
 * @export
 * @param {Object} req request
 * @param {Object} res response
 * @returns {Object} poll instances
 */


var findPolls = exports.findPolls = function () {
  var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(req, res) {
    var _req$query, _req$query$limit, limit, _req$query$offset, offset, status, author, query, polls;

    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _req$query = req.query, _req$query$limit = _req$query.limit, limit = _req$query$limit === undefined ? 10 : _req$query$limit, _req$query$offset = _req$query.offset, offset = _req$query$offset === undefined ? 0 : _req$query$offset, status = _req$query.status, author = _req$query.author;
            query = {};

            if (status) {
              query.status = status;
            }
            if (author) {
              query.author = author;
            }

            _context4.next = 7;
            return _index.Poll.find(query).limit(+limit).skip(+offset).populate('author', '_id displayName').populate('options').sort('-date');

          case 7:
            polls = _context4.sent;
            return _context4.abrupt('return', showSuccess(res, 200, polls));

          case 11:
            _context4.prev = 11;
            _context4.t0 = _context4['catch'](0);

            console.log(_context4.t0);
            return _context4.abrupt('return', showError(_context4.t0, res));

          case 15:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this, [[0, 11]]);
  }));

  return function findPolls(_x8, _x9) {
    return _ref4.apply(this, arguments);
  };
}();

/**
 * Delete Poll
 *
 * @export
 * @param {Object} req request
 * @param {Object} res response
 * @returns {Object} delete message
 */


var deletePoll = exports.deletePoll = function () {
  var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(req, res) {
    var _this = this;

    var body, _req$body, authorId, options, id, _id, poll;

    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            body = req.body, _req$body = req.body, authorId = _req$body.author._id, options = _req$body.options, id = req.params.id, _id = req.decoded._id;


            (0, _auth.ownsPoll)(authorId, _id);

            _context6.next = 5;
            return _index.Poll.remove({ _id: id });

          case 5:
            poll = _context6.sent;

            options.forEach(function () {
              var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(option) {
                return _regenerator2.default.wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        _context5.next = 2;
                        return _index.Option.deleteOne({ _id: option._id });

                      case 2:
                        return _context5.abrupt('return', _context5.sent);

                      case 3:
                      case 'end':
                        return _context5.stop();
                    }
                  }
                }, _callee5, _this);
              }));

              return function (_x12) {
                return _ref6.apply(this, arguments);
              };
            }());

            return _context6.abrupt('return', showSuccess(res, 200, poll));

          case 10:
            _context6.prev = 10;
            _context6.t0 = _context6['catch'](0);
            return _context6.abrupt('return', showError(_context6.t0, res));

          case 13:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, this, [[0, 10]]);
  }));

  return function deletePoll(_x10, _x11) {
    return _ref5.apply(this, arguments);
  };
}();

/**
 * Delete Polls
 *
 * @export
 * @param {Object} req request
 * @param {Object} res response
 * @returns {Object} delete message
 */
// export async function deletePolls(req, res) {
//   try {
//     const poll = await Poll.deleteMany({});

//     return showSuccess(res, 200, poll);
//   } catch (error) {
//     return showError(error, res);
//   }
// }


var _index = require('../models/index');

var _auth = require('../controllers/auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var showSuccess = exports.showSuccess = function showSuccess(res, code, data) {
  return res.status(code).json({ status: 'success', data: data });
};
var showError = exports.showError = function showError(error, res) {
  return res.status(500).json({ status: 'error', message: error.message });
};