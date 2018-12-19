import React, { Component } from 'react';
import cn from 'classnames';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/home/HomePage';
import PortfolioPage from './components/portfolio/PortfolioPage';
import AboutPage from './components/about/AboutPage';
import AdminPage from './components/admin/AdminPage';
import style from './styles/app.module.styl';
import './styles/global.styl';
import './styles/breakpoints.styl';
import 'typeface-gamja-flower';
import 'typeface-raleway';

export const ThemeContext = React.createContext();

class App extends Component {
  constructor() {
    super();
    this.state = {
      theme: 'cold',
    };
  }
  changeTheme = () => {
    const newTheme = this.state.theme === 'cold' ? 'hot' : 'cold';
    this.setState({
      theme: newTheme,
    });
  };

  render() {
    const { theme } = this.state;
    let opposedTheme = theme === 'cold' ? 'hot' : 'cold';
    return (
      <div className={style.app}>
        <Router>
          <>
            <Header>
              <button
                className={cn(style.changeThemeButton, opposedTheme)}
                onClick={() => this.changeTheme()}>
                Change Theme to {opposedTheme}
              </button>
            </Header>
            <div className={style.contentWrapper}>
              <ThemeContext.Provider value={this.state.theme}>
                <Route path="/about-me" component={AboutPage} />
                <Route path="/portfolio" component={PortfolioPage} />
                <Route path="/" exact component={HomePage} />
                <Route path="/admin" component={AdminPage} />
              </ThemeContext.Provider>
            </div>
          </>
        </Router>
      </div>
    );
  }
}

export default App;
