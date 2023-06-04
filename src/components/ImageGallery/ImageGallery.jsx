import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem';
import './ImageGallery.scss';

const ImageGallery = ({ images, openModal }) => {

  return (
    <ul className="ImageGallery">
      {images.map(({ id, webformatURL, largeImageURL, tags }) => {
        return <ImageGalleryItem key={id} url={webformatURL} descr={tags} largeImage={largeImageURL} openModal={openModal}/>;
      })}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
};

export default ImageGallery;
