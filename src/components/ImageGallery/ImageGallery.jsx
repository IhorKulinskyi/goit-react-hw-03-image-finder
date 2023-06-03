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

  async onSearch () {
    // imageApi.resetHits();
    // const images = r.data.hits;
    // imageApi.addHits(images);
    imageApi.searchQuery = this.props.query;
    this.setState({ loading: true });
    const res = await imageApi.fetchImages();
    this.setState({ images: res.data.hits, loading: false });
    imageApi.resetHits();
    imageApi.addHits(res.data.hits);
  }

  async onLoadMore(){
    // this.setState({ loading: true });
    const res = await imageApi.fetchImages();
    this.setState({ images: res.data.hits, loading: false });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.query !== this.props.query) {
      this.onSearch();
    }
  }

  render() {
    const { images, loading } = this.state;
    return (
      <>
        {loading && <Loader />}
        {images && (
          <>
            <ul className="ImageGallery">
              {images.map(({ id, webformatURL, largeImageURL, tags }) => {
                return (
                  <ImageGalleryItem key={id} url={webformatURL} descr={tags} />
                );
              })}
            </ul>
            <Button handleLoadMore={this.onLoadMore}/>
          </>
        )}
      </>
    );
  }
}

export default ImageGallery;
