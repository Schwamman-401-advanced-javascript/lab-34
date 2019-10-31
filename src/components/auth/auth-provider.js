import React from 'react';
import cookie from 'react-cookies';
import jwt from 'jsonwebtoken';

import LoginContext from './context';

const API = process.env.REACT_APP_API;

export default class LoginProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      token: null,
      user: null,
      login: this.login,
      logout: this.logout,
    };
  }

  login = (username, password) => {
    fetch(`${API}/signin`, {
      method: 'post',
      mode: 'cors',
      headers: new Headers({
        'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
      })
    })
      .then(response => response.text())
      .then(token => this.verifyToken(token))
      .catch(console.log);
  }

  logout = () => {
    this.setLoginState(null, null);
  }

  verifyToken = token => {
    try {
      let user = jwt.decode(token);
      this.setLoginState(token, user);
      console.log('Logged in:', user)
    } catch(error) {
      this.logout();
      console.log(error);
    }
  }

  setLoginState = (token, user) => {
    this.setState({token, user});
    token ? cookie.save('auth', token) : cookie.remove('auth');
  }

  componentDidMount() {
    const authCookieToken = cookie.load('auth');
    this.verifyToken(authCookieToken);
  }

  render() {
    return (
      <LoginContext.Provider value={this.state}>
        {this.props.children}
      </LoginContext.Provider>
    );
  }
}