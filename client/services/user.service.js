import axios from 'axios';

export async function fecthCurrentUser(token) {
  const displayResult = (user) => ({
    data: user || {},
    loading: false,
    error: user ? false : true
  });
  try {
    const { data: { data: user } } = await axios.get('http://localhost:3000/api/v1/users/view/current', {
      headers:  {
        authorization: token
      }
    });

    return displayResult(user);
  } catch (error) {
    return displayResult(null);
  }
}
