import { axiosCovid } from './axiosClient';
const covidApi = {
  async getSummaryAllCountry() {
    const data = await axiosCovid.get('/countries');
    return data;
  },
  async getSummaryByCountry(country, time) {
    const data = await axiosCovid.get(`/historical/${country}`, {
      params: {
        lastdays: time,
      },
    });
    return data;
  },
  async getGlobalSummary() {
    const data = await axiosCovid.get(`/all`);
    return data;
  },
  async getHistoricalGlobalSummary(time) {
    const data = await axiosCovid.get(`/historical/all`, {
      params: {
        lastdays: time,
      },
    });
    return data;
  },
};
export default covidApi;

// export const getCountries = () => axios.get('https://api.covid19api.com/countries');
// export const getSummary = () => axios.get('https://api.covid19api.com/summary');
// export const getReportByCountry = (country) =>
//   axios.get(`https://api.covid19api.com/dayone/country/${country}`);
