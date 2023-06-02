import { Component } from 'react';
import './Searchbar.scss';

class SearchBar extends Component {
  state = {
    query: '',
  };

  handleChange = e => {
    const { value } = e.target;
    this.setState({ query: value.trim() });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.query === '') {
      alert('no query');
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

export default SearchBar;
