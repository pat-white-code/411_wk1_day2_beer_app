import React from 'react';
import logo from './logo.svg';
import './App.css';
import Moment from 'react-moment';
import BeerDisplay from './BeerDisplay';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>The time is <Moment format='B33r-mm A'/></h1>
          <img src={logo} className="App-logo" alt="logo" />
          <BeerDisplay />
        </header>
      </div>
    );
  }
}

export default App;
