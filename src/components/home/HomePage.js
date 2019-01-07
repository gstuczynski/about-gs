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
      welcomeText: 'No data',
      feedbackText: '',
      sendFeedbackSuccess: false,
      feedbackWasSent: false,
      isLoading: true,
      isError: false,
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
          welcomeText: response.data[0].welcomeText,
          feedbackText: response.data[0].feedbackText,
          isLoading: false,
        });
      })
      .catch(() => {
        this.setState({ isError: true });
      });
  }
  // Particles are reloading on each change state, what looks strange
  shouldComponentUpdate(nextProps, nextState) {
    return this.state.feedbackFormInput === nextState.feedbackFormInput;
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
    const { sendFeedbackSuccess, isLoading, isError, welcomeText } = this.state;
    if (isError) {
      welcomeText = 'Something went wrong!';
    }

    let infoAfterSentFeedback = sendFeedbackSuccess ? (
      <div className={cn(style.feedbackInfo, style.feedbackSuccess)}>Thank you for feedback</div>
    ) : (
      <div className={cn(style.feedbackInfo, style.feedbackError)}>
        Something went wrong, try again later.
      </div>
    );

    // theme may looks stange, but here i haven't theme, but i get it by context in return - so it works.

    let theme;
    let contentBox = isLoading ? (
      <div className="spinner">Loading...</div>
    ) : (
      <div
        className={cn(style.welcomeText, { theme: theme })}
        dangerouslySetInnerHTML={{ __html: this.state.welcomeText }}
      />
    );

    return (
      <ThemeContext.Consumer>
        {({ theme, mobile }) => (
          <div className={cn(style.homePage, theme)}>
            {!mobile && (
              <Particles params={particlesParams} style={{ position: 'fixed', top: '0' }} />
            )}
            <div className={style.homeContent}>
              {contentBox}
              <div className={cn(style.feedback, theme)}>
                <div
                  className={style.feedbackText}
                  dangerouslySetInnerHTML={{ __html: this.state.feedbackText }}
                />
                {this.state.feedbackWasSent && infoAfterSentFeedback}
                {!this.state.feedbackWasSent && (
                  <form onSubmit={this.handleFeedbackSubmit}>
                    <textarea
                      value={this.state.feedbackFormInput}
                      onInput={this.handleFeedbackChange}
                    />
                    <input type="submit" value="Submit" />
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </ThemeContext.Consumer>
    );
  }
}

export default HomePage;
