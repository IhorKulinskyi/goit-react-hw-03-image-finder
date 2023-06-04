import axios from 'axios';

const fetchImages = async (searchQuery, page) => {
  try {
    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '35277582-b50a1a83cc1a7d3dd10451290';
    const params = {
      q: searchQuery,
      key: API_KEY,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: page,
      per_page: 12,
    };
    const response = await axios.get(`${BASE_URL}`, { params });
    // this.page += 1;
    //   console.log(response.data.hits);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default fetchImages;
