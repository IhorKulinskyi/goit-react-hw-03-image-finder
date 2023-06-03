import './ImageGalleryItem.scss';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ url, descr }) => {
  return (
    <li className="ImageGalleryItem">
      <img className="ImageGalleryItem-image" src={url} alt={descr} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  descr: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
