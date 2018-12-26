import React, { Component } from 'react';
import axios from 'axios';
import { string } from 'prop-types';
import config from '../../config';

export default class TextEditor extends Component {
  static propTypes = {
    getEndpoint: string.isRequired,
    updateEndpoint: string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  componentDidMount() {
    axios
      .get(`${config.backendAddress}/info/${this.props.getEndpoint}`)
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
      .post(`${config.backendAddress}/info/${this.props.updateEndpoint}`, this.state, {
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
