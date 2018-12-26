import React, { Component } from 'react';
import axios from 'axios';
import LoginForm from './LoginForm';
import ProjectsEditor from './ProjectsEditor';
import TextEditor from './TextEditor';
import style from '../../styles/admin.module.styl';
import config from '../../config';

export default class AdminPage extends Component {
  constructor() {
    super();
    this.state = {
      isAuth: false,
      token: '',
      authFailed: null,
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    // TODO verify token
    if (token) {
      this.setState({
        token,
        isAuth: true,
      });
    }
  }

  onLogin = (email, password) => {
    return axios
      .post(`${config.backendAddress}/auth/login`, {
        email,
        password,
      })
      .then(response => {
        if (response.data) {
          const token = response.data.token;
          if (token) {
            localStorage.setItem('token', token);
            return this.setState({
              token,
              isAuth: true,
            });
          }
        }
        return this.setState({
          isAuth: false,
          authFailed: false,
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  onLogout = () => {
    return axios.post(`${config.backendAddress}/auth/logout`).catch(err => {
      console.log(err);
    });
  };

  render() {
    return (
      <div className={style.adminPage}>
        <LoginForm onLogin={this.onLogin} onLogout={this.onLogout} />
        {this.state.isAuth && (
          <div>
            <ProjectsEditor />
            <TextEditor getEndpoint={'about-gs'} updateEndpoint={'aboutgs-update'} />
            <TextEditor getEndpoint={'home-content'} updateEndpoint={'home-content-update'} />
          </div>
        )}
      </div>
    );
  }
}
