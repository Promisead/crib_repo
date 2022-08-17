import React from 'react';
import {
  MuiThemeProvider,
  createMuiTheme,
  responsiveFontSizes,
} from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Navigation from './components/navigation';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import './scss/index.scss';

function App() {
  let theme = createMuiTheme({});
  theme = responsiveFontSizes(theme);
  return (
    // <LandingPage/>
    <MuiThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div className="main-site-content">
          <CssBaseline />
          <Navigation />
        </div>
      </MuiPickersUtilsProvider>
    </MuiThemeProvider>
  );
}

export default App;
