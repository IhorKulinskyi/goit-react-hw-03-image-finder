import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './App.scss';

import fetchImages from 'services/fetchImages';
import SearchBar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import Loader from 'components/Loader';
import Modal from 'components/Modal';

class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    totalHits: [],
    images: [],
    loading: false,
    endOfSearch: true,
    showModal: false,
    currentImage: '',
    currentImageDescr: '',
  };

  componentDidUpdate(_, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.onSearch();
    }
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  openModal = (image, descr) => {
    this.setState({
      currentImage: image,
      currentImageDescr: descr,
    });
    this.toggleModal();
  };

  onSearch = async () => {
    const { searchQuery, page, totalHits } = this.state;
    this.setState({ images: [], totalHits: [], loading: true });
    const res = await fetchImages(searchQuery, page);
    this.setState(({ page }) => ({ page: (page += 1) }));
    if (res.data.hits.length === 0) {
      this.setState({ images: null, loading: false, endOfSearch: true });
      toast.warn('No images found');
      return;
    }
    this.setState({
      images: res.data.hits,
      totalHits: res.data.hits,
      loading: false,
      endOfSearch: false,
    });

    const filteredSet = new Set(totalHits.map(JSON.stringify));

    const filteredHits = Array.from(filteredSet).map(JSON.parse).length;
    if (filteredHits === res.data.totalHits) {
      this.setState({ endOfSearch: true });
    }
  };

  onLoadMore = async () => {
    const { searchQuery, page, totalHits } = this.state;
    const res = await fetchImages(searchQuery, page);
    this.setState(({ page }) => ({ loading: true, page: (page += 1) }));
    this.setState(({ totalHits, images, loading }) => ({
      totalHits: [totalHits, ...res.data.hits],
      images: [...images, ...res.data.hits],
      loading: false,
    }));
    const filteredSet = new Set(totalHits.map(JSON.stringify));

    const filteredHits = Array.from(filteredSet).map(JSON.parse).length;
    if (filteredHits === res.data.totalHits) {
      this.setState({ endOfSearch: true });
    }
  };

  onHandleSubmit = query => {
    this.setState({ searchQuery: query, page: 1 });
  };

  render() {
    const {
      images,
      loading,
      endOfSearch,
      showModal,
      currentImage,
      currentImageDescr,
    } = this.state;
    return (
      <div className="App">
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={currentImage} alt={currentImageDescr} />
          </Modal>
        )}
        <SearchBar onSubmit={this.onHandleSubmit} />
        {<ImageGallery images={images} openModal={this.openModal} />}
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
