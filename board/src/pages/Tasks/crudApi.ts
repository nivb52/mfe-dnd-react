import axios from 'axios';

const getConfig = () => ({
  apiVersion: 'v1',
  apiBase: 'http://localhost:4000/api',
});
const config = getConfig();
const endpoint = `${config.apiBase}/${config.apiVersion}/board`;

export const getTasks = async (onSuccess: Function, onError: Function) => {
  axios
    .get(endpoint)
    .then((res) => onSuccess(res.data))
    .catch((error) => {
      console.error(error);
      onError(error);
    });
};

export const updateTasks = (data, onSuccess: Function, onError: Function) => {
  axios
    .post(endpoint, data)
    .then((res) => onSuccess(res.data))
    .catch((error) => {
      console.error(error);
      onError(error);
    });
};
