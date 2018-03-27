import { Poll, Option } from '../models/index';
import { ownsPoll } from '../controllers/auth';

export const showSuccess = (res, code, data) => res.status(code).json({ status: 'success', data });
export const showError = (error, res) => res.status(500).json({ status: 'error', message: error.message });
/**
 * Create Poll
 *
 * @export
 * @param {Object} req request
 * @param {Object} res response
 * @returns {Object} poll instance
 */
export async function createPoll(req, res) {
  try {
    const { decoded: { _id }, body } = req;
    body.author = _id;
    const poll = await Poll.create(body);

    return showSuccess(res, 201, poll);
  } catch (error) {
    console.log(error)
    return showError(error, res);
  }
}

/**
 * Update Poll
 *
 * @export
 * @param {Object} req request
 * @param {Object} res response
 * @returns {Object} updated poll instance
 */
export async function updatePoll(req, res) {
  try {
    const { body, params: { id }, decoded: { _id } } = req;

    ownsPoll(body.author._id, _id);
    const { author, date, stats, _id: pollId, ...rest } = body;
    console.log(rest);
    const poll = await Poll.findByIdAndUpdate(id, rest, { new: true })
      .populate('author', 'displayName')
      .populate('options');

    return showSuccess(res, 200, poll);
  } catch (error) {
    return showError(error, res);
  }
}

/**
 * Find Poll
 *
 * @export
 * @param {Object} req request
 * @param {Object} res response
 * @param {Function} next the callback
 * @returns {Object}  poll instance
 */
export async function findPoll(req, res, next) {
  try {
    const poll = await Poll.findById(req.params.id)
      .populate('author')
      .populate('options');

    return showSuccess(res, 200, poll);
  } catch (error) {
    return showError(error, res);
  }
}

/**
 * Find Polls
 *
 * @export
 * @param {Object} req request
 * @param {Object} res response
 * @returns {Object} poll instances
 */
export async function findPolls(req, res) {
  try {
    const { query: { limit = 10, offset = 0, status, author } } = req;
    const query = {}
    if (status) {
      query.status = status
    }
    if (author) {
      query.author = author
    }

    const polls = await Poll.find(query)
      .limit(+limit)
      .skip(+offset)
      .populate('author', '_id displayName')
      .populate('options')
      .sort('-date');

    return showSuccess(res, 200, polls);
  } catch (error) {
    console.log(error)
    return showError(error, res);
  }
}

/**
 * Delete Poll
 *
 * @export
 * @param {Object} req request
 * @param {Object} res response
 * @returns {Object} delete message
 */
export async function deletePoll(req, res) {
  try {
    const {
      body,
      body: { author: { _id: authorId }, options },
      params: { id },
      decoded: { _id }
    } = req;

    ownsPoll(authorId, _id);

    const poll = await Poll.remove({ _id: id });
    options.forEach( async option => await Option.deleteOne({ _id: option._id }));


    return showSuccess(res, 200, poll);
  } catch (error) {
    return showError(error, res);
  }
}

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
