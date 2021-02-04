import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import './styles/index.css';
import App from './components/App';
// import {RootReducer} from "./reducers/RootReducer";
//
// const store = createStore(RootReducer)

ReactDOM.render(
  <React.StrictMode>
      {/*<Provider store={store}>*/}
          <App />
      {/*</Provider>*/}
  </React.StrictMode>,
  document.getElementById('root')
);
