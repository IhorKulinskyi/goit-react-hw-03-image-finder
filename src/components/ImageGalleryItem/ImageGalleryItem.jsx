import PropTypes from 'prop-types';

import './ImageGalleryItem.scss';

const ImageGalleryItem = ({ url, descr, largeImage, openModal }) => {
  return (
    <button
      type="button"
      className="imageWrapperBtn"
      onClick={() => {
        openModal(largeImage, descr);
      }}
    >
      <li className="imageGalleryItem">
        <img className="imageGalleryItem-image" src={url} alt={descr} />
      </li>
    </button>
  );
};

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  descr: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
