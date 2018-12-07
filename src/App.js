import React, { Component } from 'react';
import Header from './components/Header';
import PortfolioPage from './components/portfolio/PortfolioPage';
import AboutPage from './components/about/AboutPage';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import style from './styles/app.module.styl';

class App extends Component {
  render() {
    return (
      <div style={{ height: 2000 }}>
        <Router>
          <>
            <Header />

            <div className={style.contentWrapper}>
              <Route path="/about-me" component={AboutPage} />
              <Route path="/portfolio" component={PortfolioPage} />
            </div>
          </>
        </Router>
      </div>
    );
  }
}

export default App;
