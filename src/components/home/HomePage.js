import React from 'react';
import cn from 'classnames';
import Particles from 'react-particles-js';
import axios from 'axios';
import config from '../../config';
import style from '../../styles/home.page.module.styl';
import { ThemeContext } from '../../App';
import '../../assets/dupa.svg';

const particlesParams = {
  fps_limit: 10,
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
      },
    },
    line_linked: {
      enable: true,
      distance: 30,
      opacity: 0.4,
    },
    move: {
      speed: 0.5,
    },
    opacity: {
      anim: {
        enable: true,
        opacity_min: 1,
        speed: 5,
        sync: false,
      },
      value: 0.4,
    },
  },
  polygon: {
    enable: true,
    scale: 0.5,
    type: 'inline',
    move: {
      radius: 10,
    },
    url: 'images/dupa.svg',
    inline: {
      arrangement: 'equidistant',
    },
    draw: {
      enable: true,
      stroke: {
        color: 'rgba(255, 255, 255, .2)',
      },
    },
  },
  retina_detect: true,
  interactivity: {
    events: {
      onhover: {
        enable: true,
        mode: 'bubble',
      },
    },
    modes: {
      bubble: {
        size: 20,
        distance: 20,
      },
    },
  },
};

class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      welcomeText: 'Something went wrong!',
      feedbackText: '',
      sendFeedbackSuccess: false,
      feedbackWasSent: false,
    };
  }

  componentDidMount() {
    return axios
      .get(`${config.backendAddress}/home`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
      .then(response => {
        this.setState({
          welcomeText: response.data.welcomeText,
          feedbackText: response.data.feedbackText,
        });
      })
      .catch(() => {
        this.setState({ isError: true });
      });
  }

  handleFeedbackChange = event => {
    this.setState({ feedbackFormInput: event.target.value });
  };

  handleFeedbackSubmit = event => {
    event.preventDefault();
    axios
      .post(`${config.backendAddress}/sendFeedback`, {
        feedbackText: this.state.feedbackFormInput,
      })
      .then(() => this.setState({ sendFeedbackSuccess: true }))
      .catch(() => this.setState({ sendFeedbackSuccess: false }))
      .finally(() => this.setState({ feedbackWasSent: true }));
  };

  render() {
    let infoAfterSentFeedback = this.state.sendFeedbackSuccess ? (
      <div className={cn(style.feedbackInfo, style.feedbackSuccess)}>dupa</div>
    ) : (
      <div className={cn(style.feedbackInfo, style.feedbackError)}>gówno</div>
    );

    return (
      <ThemeContext.Consumer>
        {value => (
          <div className={cn(style.homePage, value)}>
            <Particles
              params={particlesParams}
              style={{ height: '100vh', width: '100vw', top: '0' }}
            />
            <div
              className={cn(style.welcomeText, value)}
              dangerouslySetInnerHTML={{ __html: this.state.welcomeText }}
            />
            <div className={cn(style.feedback, value)}>
              <div dangerouslySetInnerHTML={{ __html: this.state.welcomeText }} />
              <form onSubmit={this.handleFeedbackSubmit}>
                {this.state.feedbackWasSent && infoAfterSentFeedback}
                <input
                  type="text"
                  value={this.state.feedbackFormInput}
                  onChange={this.handleFeedbackChange}
                />
                <input type="submit" value="Submit" />
              </form>
            </div>
          </div>
        )}
      </ThemeContext.Consumer>
    );
  }
}

export default HomePage;
