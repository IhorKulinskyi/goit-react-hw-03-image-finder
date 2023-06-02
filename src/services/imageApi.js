import axios from 'axios';

export default class ImageApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.totalHits = [];
  }
  async fetchImages() {
    try {
      const BASE_URL = 'https://pixabay.com/api/';
      const API_KEY = '35277582-b50a1a83cc1a7d3dd10451290';
      const params = {
        q: this.searchQuery,
        key: API_KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: this.page,
        per_page: 12,
      };
      const response = await axios.get(`${BASE_URL}`, { params });
      this.page += 1;
    //   console.log(response.data.hits);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  addHits(hits) {
    this.totalHits.push(...hits);
  }

  filterHits() {
    const filteredSet = new Set(this.totalHits.map(JSON.stringify));

    return Array.from(filteredSet).map(JSON.parse).length;
  }

  resetHits() {
    this.totalHits = [];
  }

  resetPageCounter() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}