import React, { Component } from 'react';
import axios from 'axios';
import { string, bool, arrayOf } from 'prop-types';
import config from '../../config';

class SingleProjectEditor extends Component {
  static propTypes = {
    text: string,
    image: string,
    openInModal: bool,
    url: string,
    id: string.isRequired,
    mobileUrl: string,
    repos: arrayOf(string),
  };

  static defaultProps = {
    text: null,
    image: null,
    openInModal: false,
    url: null,
    mobileUrl: null,
    repos: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      text: this.props.text,
      image: this.props.image,
      openInModal: this.props.openInModal,
      url: this.props.url,
      mobileUrl: this.props.mobileUrl,
      id: this.props.id,
      repos: this.props.repos,
    };
  }

  onSubmit = () => {
    const token = localStorage.getItem('token');
    axios
      .post(`${config.backendAddress}/info/project-update`, this.state, {
        headers: { authorization: token },
      })
      .then(response => console.log('updated').catch(err => console.log(err)));
  };

  onChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  render() {
    return (
      <form
        onSubmit={evt => {
          evt.preventDefault();
          this.onSubmit(evt);
        }}>
        <input
          type="text"
          value={this.state.url}
          name={'url'}
          onChange={evt => this.onChange(evt)}
        />
        <input
          type="text"
          value={this.state.image}
          name={'image'}
          onChange={evt => this.onChange(evt)}
        />
        <input
          type="text"
          value={this.state.text}
          name={'text'}
          onChange={evt => this.onChange(evt)}
        />
        <input
          type="text"
          value={this.state.mobileUrl}
          name={'mobileUrl'}
          onChange={evt => this.onChange(evt)}
        />
        <input
          type="text"
          value={this.state.repos}
          name={'repos'}
          onChange={evt => this.onChange(evt)}
        />
        <input
          type="checkbox"
          defaultChecked={this.state.openInModal}
          name={'openInModal'}
          onChange={() => this.setState({ openInModal: !this.state.openInModal })}
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default SingleProjectEditor;
