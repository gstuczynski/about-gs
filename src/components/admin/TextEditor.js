import React, { Component } from 'react';
import axios from 'axios';
import { string } from 'prop-types';
import config from '../../config';

export default class TextEditor extends Component {
  static propTypes = {
    getEndpoint: string.isRequired,
    updateEndpoint: string.isRequired,
    attribute: string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }

  componentDidMount() {
    axios
      .get(`${config.backendAddress}/info/${this.props.getEndpoint}`)
      .then(response => {
        this.setState({ inputValue: response.data[0][this.props.attribute] });
      })
      .catch(err => {
        console.log(err);
      });
  }

  onSubmit = () => {
    const token = localStorage.getItem('token');
    return axios
      .post(
        `${config.backendAddress}/info/${this.props.updateEndpoint}`,
        { [this.props.attribute]: this.state.inputValue },
        {
          headers: { authorization: token },
        }
      )
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
          value={this.state.inputValue}
          type="textarea"
          onChange={evt => this.setState({ inputValue: evt.target.value })}
          rows="10"
          cols="100"
        />
        <button onClick={this.onSubmit}>Submit</button>
      </div>
    );
  }
}
