import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import LoginProvider from './components/auth/auth-provider';

import App from './app.js';

class Main extends React.Component {
  render() {
    return (
      <LoginProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </LoginProvider>
    );
  }
}

const rootElement = document.getElementById('root');
ReactDOM.render(<Main />, rootElement);
