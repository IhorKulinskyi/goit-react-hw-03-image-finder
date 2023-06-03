import './Button.scss';

const Button = ({handleLoadMore}) => {
  return (
    <button className="Button" onClick={handleLoadMore}>
      Load more
    </button>
  );
};

export default Button;
