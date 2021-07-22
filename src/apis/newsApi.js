import { axiosNews } from './axiosClient';
const newApi = {
  async getAllNews() {
    // const data = await axiosNews.get('/top-headlines', {
    //   params: {
    //     sources: 'bbc-news',
    //     // from: '2021-06-07',
    //     // sortBy: 'publishedAt',
    //     apiKey: '5492716e49eb4c87baedd4b91d4925c5',
    //   },
    // });
    const data = await axiosNews.get('/articles');
    return data;
    return data;
  },
};
export default newApi;
