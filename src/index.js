import React from 'react';
import { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import GitUser from './components/App';

const App = () => (
  <MuiThemeProvider>
    <GitUser />
  </MuiThemeProvider>
);


render( <App />, document.querySelector('.main'));
