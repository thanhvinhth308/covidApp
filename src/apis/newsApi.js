import { axiosNews } from './axiosClient';
const newsApi = {
  async getAllNews(pagination) {
    const data = await axiosNews.get('/articles', {
      params: {
        _page: pagination.page,
        _limit: pagination.limit,
      },
    });
    return data;
  },
};
export default newsApi;
