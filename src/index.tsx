import React from 'react';
import ReactDOM from 'react-dom';

import thunk from "redux-thunk";
import {Provider} from "react-redux";
import {createStore, applyMiddleware, Store} from "redux";

import App from './comonents/App';
import reducer from "./store/reducer";

const store: Store<TransactionState, TransactionAction> & {
  dispatch: DispatchType
} = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App/>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

