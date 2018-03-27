import axios, { axiosSnackBar } from './axios';

export async function fecthPolls() {
  const displayResult = (polls) => ({
    data: polls || [],
    loading: false,
    error: polls ? false : true
  });

  try {
    const { data: { data: polls } }= await axios({
      url: 'polls/view',
      params: {
        limit: 9
      }
    });

    return displayResult(polls);
  } catch (error) {
    return displayResult(null);
  }
}

export async function fecthPoll(id, token) {
  try {
    const { data: { data } }  = await axios({
      url: `polls/${id}`,
      headers:  {
        authorization: token
      }
    });


    return data;
  } catch (error) {
    const { response: { data } } = error;
    return data;
  }
}

export async function createPoll(title, token) {
  try {
    let { data } = await axiosSnackBar({
      url: 'polls/create',
      headers:  {
        authorization: token
      },
      method: 'POST',
      data: { title }
    });

    const poll = data.data;

    return poll;
  } catch(error) {
    const { response: { data } } = error;
    return data;
  }
}

export async function updatePollTitle(pollData, token) {
  try {
    const { options, status, _id, date, stats, ...poll } = pollData;
    const { data: { data } } = await axiosSnackBar({
      url: `polls/${_id}/update`,
      headers: {
        authorization: token
      },
      method: 'POST',
      data: poll
    });

    return data;
  } catch(error) {
    const { response: { data } } = error;
    return data;
  }
}

export async function publishPoll(pollData, token) {
  try {
    const { options, title,  _id, date, stats, ...poll } = pollData;
    const { data: { data } } = await axiosSnackBar({
      url: `polls/${_id}/update`,
      headers: {
        authorization: token
      },
      method: 'POST',
      data: poll
    });

    return data;
  } catch(error) {
    const { response: { data } } = error;
    return data;
  }
}

export async function deletePoll(poll, token) {
  try {
    const { data: { data } } = await axiosSnackBar({
      url: `polls/${poll._id}/delete`,
      headers: {
        authorization: token
      },
      method: 'DELETE',
      data: poll
    });

    return data;
  } catch(error) {
    console.log(error)
    const { response: { data } } = error;
    return data;
  }
}
