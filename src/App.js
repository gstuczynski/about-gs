import React, { Component } from 'react';
import Header from './components/Header';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const Home = () => (
  <div>
    <h2> Home </h2>
  </div>
);

const City = () => (
  <div>
    <ul>
      <li>San Francisco</li>
      <li>Istanbul</li>
      <li>Tokyo</li>
    </ul>
  </div>
);

class App extends Component {
  render() {
    return (
      <div style={{ height: 2000 }}>
        <Router>
          <>
            <Header />
            <Route path="/about" component={() => <div>dupa</div>} />
          </>
        </Router>
      </div>
    );
  }
}

export default App;
