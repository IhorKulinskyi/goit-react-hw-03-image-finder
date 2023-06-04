import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './App.scss';

import ImageApiService from 'services/imageApi';
import SearchBar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import Loader from 'components/Loader';

const imageApi = new ImageApiService();

class App extends Component {
  state = {
    searchQuery: '',
    images: null,
    loading: false,
    endOfSearch: false,
  };

  async onSearch() {
    imageApi.resetHits();
    imageApi.resetPageCounter();
    imageApi.searchQuery = this.state.searchQuery;
    this.setState({ loading: true });
    const res = await imageApi.fetchImages();
    if (res.data.hits.length === 0) {
      this.setState({ images: null, loading: false, endOfSearch: true });
      toast.warn('No images found');
      return;
    }
    this.setState({ endOfSearch: false });
    imageApi.addHits(res.data.hits);
    this.setState({ images: res.data.hits, loading: false });
    if (imageApi.filterHits() === res.data.totalHits) {
      this.setState({ endOfSearch: true });
    }
  }

  onLoadMore = async () => {
    this.setState({ loading: true });
    const res = await imageApi.fetchImages();
    imageApi.addHits(res.data.hits);
    this.setState(prevState => ({
      images: [...prevState.images, ...res.data.hits],
      loading: false,
    }));
    if (imageApi.filterHits() === res.data.totalHits) {
      this.setState({ endOfSearch: true });
    }
  };

  onHandleSubmit = query => {
    this.setState({ searchQuery: query });
  };

  componentDidMount() {
    this.setState({ endOfSearch: true });
  }

  async componentDidUpdate(_, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.onSearch();
    }
  }

  render() {
    const { images, loading, endOfSearch } = this.state;
    return (
      <div className="App">
        <SearchBar onSubmit={this.onHandleSubmit} />
        {images && <ImageGallery images={images} />}
        {loading && <Loader />}
        {!endOfSearch && <Button handleLoadMore={this.onLoadMore} />}
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="light"
        />
      </div>
    );
  }
}

export { App };
