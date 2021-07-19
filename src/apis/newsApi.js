import { axiosNews } from './axiosClient';
const newApi = {
  async getAllNews() {
    const data = await axiosNews.get('/top-headlines', {
      params: {
        sources: 'bbc-news',
        // from: '2021-06-07',
        // sortBy: 'publishedAt',
        apiKey: '5492716e49eb4c87baedd4b91d4925c5',
      },
    });
    return data;
  },
};
export default newApi;

// export const getCountries = () => axios.get('https://api.covid19api.com/countries');
// export const getSummary = () => axios.get('https://api.covid19api.com/summary');
// export const getReportByCountry = (country) =>
//   axios.get(`https://api.covid19api.com/dayone/country/${country}`);
