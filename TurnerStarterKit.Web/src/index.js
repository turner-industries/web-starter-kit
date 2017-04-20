/** @jsx createElement */
import {createElement} from 'react';
import {render} from 'react-dom';
import {combineReducers, createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware,
} from 'react-router-redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';

import reducers from './store';
import App from './App';

import 'semantic-ui-css/semantic.css';
import './index.scss';

const history = createHistory();
const historyMiddleware = routerMiddleware(history);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer,
  }),
  composeEnhancers(applyMiddleware(historyMiddleware, thunk)),
);

const rootEl = document.getElementById('root');

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  rootEl,
);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    render(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <NextApp />
        </ConnectedRouter>
      </Provider>,
      rootEl,
    );
  });
}
