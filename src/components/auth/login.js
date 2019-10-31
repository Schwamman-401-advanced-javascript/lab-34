import React from 'react';

import LoginContext from './context';

export default class Login extends React.Component {
  static contextType = LoginContext;

  handleSubmit = e => {
    e.preventDefault();

    let { username, password } = e.target;
    this.context.login(username.value, password.value);
    e.target.reset();
  }

  render() {
    if (this.context.user) {
      return (
        <p>Hello, {this.context.user.type}. You've successfully logged in. </p>
      )
    }

    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <input 
            placeholder="username"
            name="username"
          />
          <input
            type="password"
            placeholder="password"
            name="password"
          />
          <button>Login</button>
        </form>
        <ul>
          <li><b>Admin</b> - no restrictions</li>
          <ul>
            <li>Username: admin</li>
            <li>Password: ADMIN</li>
          </ul>
          <li><b>Editor</b> - read, create</li>
          <ul>
            <li>Username: editor</li>
            <li>Password: EDITOR</li>
          </ul>
          <li><b>User</b> - read only</li>
          <ul>
            <li>Username: user</li>
            <li>Password: USER</li>
          </ul>

        </ul>
      </>
    )
  }
}