import { Component } from 'react';
import './App.scss';
import SearchBar from 'components/Searchbar';
import ImageApiService from 'services/imageApi';

const imageApi = new ImageApiService();

class App extends Component {
  state = {
    searchQuery: '',
    hits: [],
  };
  onHandleSubmit = query => {
    this.setState({ searchQuery: query });
    this.searchImages();
  };

  async searchImages() {
    imageApi.searchQuery = this.state.searchQuery;
    const res = await imageApi.fetchImages();
    console.log(res.data.hits);
    this.setState({ hits: res.data.hits });
  }

  render() {
    return (
      <div className="App">
        <SearchBar onSubmit={this.onHandleSubmit} />
        <ul className="gallery"></ul>
      </div>
    );
  }
}

export { App };
