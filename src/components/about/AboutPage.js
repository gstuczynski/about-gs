import React from 'react';
import Particles from 'react-particles-js';
import axios from 'axios';
import cn from 'classnames';
import config from '../../config';
import style from '../../styles/about.page.module.styl';
import { ThemeContext } from '../../App';
import particlesParams from '../../assets/particlesConfigs/circles.json';

class AboutPage extends React.Component {
  constructor() {
    super();
    this.state = {
      aboutGsText: 'Something went wrong!',
    };
  }
  componentDidMount() {
    return axios
      .get(`${config.backendAddress}/about-gs`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
      .then(response => {
        this.setState({ aboutGsText: response.data });
      })
      .catch(() => {
        this.setState({ isError: true });
      });
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => (
          <div className={cn(style.aboutPage, value)}>
            <Particles params={particlesParams} style={{ position: 'fixed', top: '0' }} />
            <div
              className={cn(style.aboutText, value)}
              dangerouslySetInnerHTML={{ __html: this.state.aboutGsText }}
            />
          </div>
        )}
      </ThemeContext.Consumer>
    );
  }
}

export default AboutPage;
