import { Component } from 'react';
import { toast } from 'react-toastify';
import { IconContext } from 'react-icons';
import { AiOutlineSearch } from 'react-icons/ai';
import PropTypes from 'prop-types';

import './Searchbar.scss';

class SearchBar extends Component {
  state = {
    query: '',
  };

  handleChange = e => {
    const { value } = e.target;
    this.setState({ query: value.toLowerCase().trim() });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.query.trim() === '') {
      toast.error('Empty search input');
      return;
    }
    this.props.onSubmit(this.state.query);
  };

  render() {
    const { query } = this.state;
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <IconContext.Provider value={{ className: 'search-icon' }}>
              <AiOutlineSearch />
            </IconContext.Provider>
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            name="search"
            onChange={this.handleChange}
            value={query}
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
