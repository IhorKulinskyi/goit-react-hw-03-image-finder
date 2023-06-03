import { Component } from 'react';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';
import SearchBar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';

class App extends Component {
  state = {
    searchQuery: '',
  };

  onHandleSubmit = query => {
    this.setState({ searchQuery: query });
  };

  render() {
    const { searchQuery } = this.state;
    return (
      <div className="App">
        <SearchBar onSubmit={this.onHandleSubmit} />
        <ImageGallery query={searchQuery} />
        <ToastContainer />
      </div>
    );
  }
}

export { App };
