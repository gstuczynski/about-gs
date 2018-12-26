import React from 'react';
import cn from 'classnames';
import Particles from 'react-particles-js';
import axios from 'axios';
import config from '../../config';
import style from '../../styles/home.page.module.styl';
import { ThemeContext } from '../../App';
import particlesParams from '../../assets/particlesConfigs/linkedBalls.json';

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
      .get(`${config.backendAddress}/info/home-content`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
      .then(response => {
        this.setState({
          welcomeText: response.data[0].text,
          feedbackText: response.data[0].homeFeedbackText,
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
            <Particles params={particlesParams} style={{ position: 'fixed', top: '0' }} />

            <div className={style.homeContent}>
              <div
                className={cn(style.welcomeText, value)}
                dangerouslySetInnerHTML={{ __html: this.state.welcomeText }}
              />
              <div className={cn(style.feedback, value)}>
                <div dangerouslySetInnerHTML={{ __html: this.state.feedbackText }} />
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
          </div>
        )}
      </ThemeContext.Consumer>
    );
  }
}

export default HomePage;
