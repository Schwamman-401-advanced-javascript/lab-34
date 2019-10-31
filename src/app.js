import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import Auth from './components/auth/auth';
import { When } from './components/if/index';
import SettingsProvider from './context/settings/settings';
import Login from './components/auth/login';
import LoginContext from './components/auth/context';

// State Only
import ToDo from './components/todo/todo.js';

// API Connected (Live Data)
import ToDoConnected from './components/todo/todo-connected.js';

export default class App extends React.Component {
  static contextType = LoginContext;

  render() {
    return (
      <SettingsProvider>
        <nav>
          <ul>
            <When condition={!this.context.user}>
              <li><Link to="/login">Login (to access connected todo)</Link></li>
            </When>
            <When condition={this.context.user}>
              <li><Link to="/login" onClick={this.context.logout}>Logout</Link></li>
            </When>
            <li><Link to="/">Local ToDo</Link></li>
            <Auth>
              <li><Link to="/connected">Connected ToDo</Link></li>
            </Auth>
          </ul>
        </nav>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/connected" component={ToDoConnected} />
          <Route component={ToDo} />
        </Switch>
      </ SettingsProvider>
    );
  }
}
