import PropTypes from 'prop-types';

import './ImageGalleryItem.scss';
import { Component } from 'react';

class ImageGalleryItem extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    descr: PropTypes.string.isRequired,
    largeImage: PropTypes.string.isRequired,
  };

  render() {
    const { url, descr, largeImage } = this.props;
    return (
      <button
        type="button"
        className="ImageWrapperBtn"
        onClick={() => {
          this.props.openModal(largeImage, descr);
        }}
      >
        <li className="ImageGalleryItem">
          <img className="ImageGalleryItem-image" src={url} alt={descr} />
        </li>
      </button>
    );
  }
}

export default ImageGalleryItem;
