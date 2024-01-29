import axios from "axios";

const getApiWithToken = () => {
  const token = localStorage.getItem('token');
  const api = axios.create({
    baseURL: 'http://localhost:4000/',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  });

  api.interceptors.response.use(
    (response) => {
      if (response) {
        const status = response.data.status;
        if (status === 'error') {
          localStorage.removeItem('token');
          window.location.href = '/';
        }
      }
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return api;
};

export const inputCeas = async (value) =>
  await getApiWithToken().post('/ceas', value);

export const updateCeas = async (id, value) =>
  await getApiWithToken().put(`/ceas/${id}`, value);

export const deleteCeas = async (id) =>
  await getApiWithToken().delete(`/ceas/${id}`);

export const getPolygon = async () =>
  await getApiWithToken().get('/polygon');

export const getCeas = async () =>
  await getApiWithToken().get('/ceas');

export const getTambon = async () =>
  await getApiWithToken().get('/hostambon');
