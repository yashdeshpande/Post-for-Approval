import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import feedApproverReducer from './feedApproverReducer.js';
import MainComponent from './mainComponent.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import dummyData from './dummyData.js';

injectTapEventPlugin();

let store = createStore(feedApproverReducer, dummyData);
ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <MainComponent />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
