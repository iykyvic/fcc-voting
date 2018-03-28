import axios, { axiosSnackBar } from './axios';

export async function createOption(title, poll, token) {
  try {
    let { data } = await axiosSnackBar({
      url: 'options/create',
      headers:  {
        authorization: token
      },
      method: 'POST',
      data: { title, poll }
    });

    const option = data.data;

    return option;
  } catch(error) {
    const { response: { data } } = error;

    throw new Error(data);
  }
}

export async function updatePollOptionTitle(optionData, token) {
  try {
    const { _id, date, timesChosen, _id: optionId, ...option } = optionData;
    const { data: { data } } = await axiosSnackBar({
      url: `options/${_id}/update`,
      headers: {
        authorization: token
      },
      method: 'POST',
      data: option
    });

    return data;
  } catch(error) {
    const { response: { data } } = error;

    throw new Error(data);
  }
}

export async function updatePollOptionStat(optionData, finger) {
  try {
    const { title, _id, date, _id: optionId, ...option } = optionData;
    const { data: { data } } = await axiosSnackBar({
      url: `options/${_id}/updatestat`,
      method: 'POST',
      data: { finger }
    });

    return data;
  } catch(error) {
    const { response: { data } } = error;

    throw new Error(data.message);
  }
}

export async function deletePollOption(option, token) {
  try {
    const { data: { data } } = await axiosSnackBar({
      url: `options/${option._id}/delete`,
      headers: {
        authorization: token
      },
      method: 'DELETE',
      data: option
    });

    return data;
  } catch(error) {
    const { response: { data } } = error;

    throw new Error(data);
  }
}
