/** @jsx createElement */
import { createElement } from "react";
import {render} from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import App from './App';

import 'semantic-ui-css/semantic.css';
import './index.scss';

const rootEl = document.getElementById('root');

render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootEl
);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    render(
      <Provider store={store}>
        <NextApp />
      </Provider>,
      rootEl
    );
  });
}
