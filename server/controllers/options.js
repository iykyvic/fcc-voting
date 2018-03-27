import { Option, Poll } from '../models/index';
import { showError, showSuccess } from './polls';
import { ownsPoll } from './auth';

export async function createOption(req, res) {
  try {
    const {
      decoded: { _id },
      body,
      body: { poll: { _id: pollId, author: { _id: authorId } } }
    } = req;

    body.author = authorId;

    ownsPoll(authorId, _id);

    const option = await Option.create(body);
    const updatedPoll = await Poll.findByIdAndUpdate(pollId, {
      $push: { options: option._id }
    }, { new: true })
      .populate('author', '_id displayName')
      .populate('options') ;

    return showSuccess(res, 201, [option, updatedPoll]);
  } catch (error) {
    return showError(error, res);
  }
}


export async function findOptions(req, res) {

}

/**
 * Update Poll Option
 *
 * @export
 * @param {Object} req request
 * @param {Object} res response
 * @returns {Object} updated option instance
 */
export async function updatePollOption(req, res) {
  try {
    const { body, body: { author }, params: { id }, decoded: { _id } } = req;
    ownsPoll(author, _id);
    const { author: authorId, date, timesChosen, _id: optionId, ...rest } = body;
    const option = await Option.findByIdAndUpdate(id, rest, { new: true });

    return showSuccess(res, 200, option);
  } catch (error) {
    return showError(error, res);
  }
}

/**
 * Update Poll Option
 *
 * @export
 * @param {Object} req request
 * @param {Object} res response
 * @returns {Object} updated option instance
 */
export async function updatePollOptionStat(req, res) {
  try {
    const { body, body: { author }, params: { id }, decoded: { _id } } = req;

    const { author: authorId, date, title, _id: optionId, ...rest } = body;

    const option = await Option.findById(id);
    option.timesChosen += 1;
    const savedOption = await option.save();

    return showSuccess(res, 200, savedOption);
  } catch (error) {
    return showError(error, res);
  }
}


/**
 * Delete Poll Option
 *
 * @export
 * @param {Object} req request
 * @param {Object} res response
 * @returns {Object} updated option instance
 */
export async function deletePollOption(req, res) {
  try {
    const {
      body,
      body: { author, poll, _id: optionId },
      params: { id },
      decoded: { _id }
    } = req;
    ownsPoll(author, _id);

    await Poll.findByIdAndUpdate(poll, {
      '$pull': { options: optionId }
    }, { safe: true });

    const option = await Option.deleteOne({ _id: optionId });

    return showSuccess(res, 200, option);
  } catch(error) {
    return showError(error, res);
  }
}
