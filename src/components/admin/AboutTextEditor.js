import React, { Component } from 'react';
import axios from 'axios';
import config from '../../config';

export default class AboutTextEditor extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
    };
  }

  componentDidMount() {
    axios
      .get(`${config.backendAddress}/info/about-gs`)
      .then(response => {
        this.setState({ text: response.data[0].text });
      })
      .catch(err => {
        console.log(err);
      });
  }

  onSubmit = () => {
    const token = localStorage.getItem('token');
    return axios
      .post(`${config.backendAddress}/info/aboutgs-update`, this.state, {
        headers: { authorization: token },
      })
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <textarea
          value={this.state.text}
          type="textarea"
          onChange={evt => this.setState({ text: evt.target.value })}
          rows="10"
          cols="100"
        />
        <button onClick={this.onSubmit}>Submit</button>
      </div>
    );
  }
}
