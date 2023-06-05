import PropTypes from 'prop-types';
import './Button.scss';

const Button = ({ handleLoadMore }) => {
  return (
    <div className="buttonWrapper">
      <button className="button" onClick={handleLoadMore}>
        Load more
      </button>
    </div>
  );
};

Button.propTypes = {
  handleLoadMore: PropTypes.func.isRequired,
};

export default Button;
