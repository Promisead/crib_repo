import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';

import configureStore from './state/store';
import { checkLoggedIn, propertyTypes } from './apis/server';
import { getDashboard } from './helpers/helpers';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

const renderApp = (preloadedState, types, dashboard) => {
  const store = configureStore({
    user: preloadedState,
    propertyTypes: types.types,
    topTypes: types.topTypes,
    topCities: types.topCities,
    dashboard: dashboard,
  });

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>,
    document.getElementById('root')
  );
};
(async () =>
  renderApp(await checkLoggedIn(), await propertyTypes(), getDashboard()))();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
