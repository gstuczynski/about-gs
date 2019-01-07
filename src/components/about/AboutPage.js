import React from 'react';
import Particles from 'react-particles-js';
import axios from 'axios';
import cn from 'classnames';
import ReactGA from 'react-ga';
import config from '../../config';
import style from '../../styles/about.page.module.styl';
import { ThemeContext } from '../../App';
import particlesParams from '../../assets/particlesConfigs/circles.json';

class AboutPage extends React.Component {
  constructor() {
    super();
    this.state = {
      aboutGsText: 'No data',
      isLoading: true,
      isError: false,
    };
  }
  componentDidMount() {
    return axios
      .get(`${config.backendAddress}/info/about-gs`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
      .then(response => {
        this.setState({ aboutGsText: response.data[0].text, isLoading: false });
      })
      .catch(() => {
        this.setState({ isError: true });
      });
  }

  render() {
    if (this.state.isError) {
      this.setState({
        aboutGsText: 'Something went wrong!',
      });
    }
    return (
      <ThemeContext.Consumer>
        {({ theme, mobile }) => (
          <div className={cn(style.aboutPage, theme)}>
            {!mobile && (
              <Particles params={particlesParams} style={{ position: 'fixed', top: '0' }} />
            )}
            {this.state.isLoading ? (
              <div className="spinner">Loading...</div>
            ) : (
              <div
                className={cn(style.aboutText, theme)}
                dangerouslySetInnerHTML={{ __html: this.state.aboutGsText }}
              />
            )}
          </div>
        )}
      </ThemeContext.Consumer>
    );
  }
}

export default AboutPage;
