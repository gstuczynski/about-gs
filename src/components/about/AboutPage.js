import React from 'react';
import config from '../../config';
import axios from 'axios';

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
    return <div>{this.state.aboutGsText}</div>;
  }
}

export default AboutPage;
