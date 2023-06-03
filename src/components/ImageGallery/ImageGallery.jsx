import { Component } from 'react';
import PropTypes from 'prop-types';
import ImageApiService from 'services/imageApi';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Loader from 'components/Loader';
import './ImageGallery.scss';
import Button from 'components/Button';

const imageApi = new ImageApiService();

class ImageGallery extends Component {
  state = {
    images: null,
    loading: false,
  };

  static propTypes = {
    query: PropTypes.string.isRequired,
  };

  async onSearch() {
    imageApi.resetPageCounter();
    imageApi.searchQuery = this.props.query;
    this.setState({ loading: true });
    const res = await imageApi.fetchImages();
    imageApi.addHits(res.data.hits);
    this.setState({ images: res.data.hits, loading: false });
  }

  onLoadMore = async () => {
    this.setState({ loading: true });
    const res = await imageApi.fetchImages();
    this.setState(prevState => ({
      images: [...prevState.images, ...res.data.hits],
      loading: false,
    }));
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.query !== this.props.query) {
      this.onSearch();
    }
  }

  render() {
    const { images, loading } = this.state;
    return (
      <>
        {images && (
          <>
            <ul className="ImageGallery">
              {images.map(({ id, webformatURL, largeImageURL, tags }) => {
                return (
                  <ImageGalleryItem key={id} url={webformatURL} descr={tags} />
                );
              })}
            </ul>
            {loading && <Loader />}
            <Button handleLoadMore={this.onLoadMore} />
          </>
        )}
      </>
    );
  }
}

export default ImageGallery;
