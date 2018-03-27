import { User } from '../models';

export async function fetchCurrentUser(req, res) {
  try {
    const user =  await User.findOne({ id: req.decoded.id });
    if (user) {
      return res.status(200).json({ status: 'success', data: user });
    }

    return res.status(404).json({ status: 'fail', message: 'no user found' });
  } catch (error) {
    return res.status(500).json({ status: 'error', data: {} })
  }
}
