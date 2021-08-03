import axios from 'axios';
const axiosCovid = axios.create({
  baseURL: 'https://disease.sh/v3/covid-19/',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosCovid.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosCovid.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);
//Dự phòng api heroku hỏng
// const axiosNews = axios.create({
//   baseURL: 'https://newsapi.org/v2/',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });
const axiosNews = axios.create({
  baseURL: 'https://article-new.herokuapp.com/',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosNews.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosNews.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export { axiosCovid, axiosNews };
