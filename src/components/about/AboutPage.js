import React from 'react';
import axios from 'axios';
import Particles from 'react-particles-js';
import config from '../../config';
import style from '../../styles/about.page.module.styl';

const particlesParams = {
  particles: {
    number: {
      value: 50,
    },
    size: {
      value: 3,
    },
  },
  interactivity: {
    events: {
      onhover: {
        enable: true,
        mode: 'repulse',
      },
    },
  },
};

class AboutPage extends React.Component {
  constructor() {
    super();
    this.state = {
      aboutGsText: 'Something went wrong!',
    };
  }
  componentDidMount() {
    return axios
      .get(`${config.backendAddress}/about-gs`)
      .then(response => {
        this.setState({ aboutGsText: response.data });
      })
      .catch(() => {
        this.setState({ isError: true });
      });
  }

  render() {
    return (
      <div className={style.aboutPage}>
        <div className={style.aboutText}>{this.state.aboutGsText}</div>
        <Particles params={particlesParams} />
      </div>
    );
  }
}

export default AboutPage;
