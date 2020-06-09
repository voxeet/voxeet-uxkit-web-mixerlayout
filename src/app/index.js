import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import thunkMidleware from "redux-thunk";
import promiseMiddleware from "redux-promise";
import { combineReducers, createStore, applyMiddleware } from "redux";

import {
  ConferenceRoom,
  reducer as voxeetReducer,
} from "./VoxeetReactComponents";

const reducers = combineReducers({
  voxeet: voxeetReducer,
});

const configureStore = () =>
  createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunkMidleware, promiseMiddleware)
  );

ReactDOM.render(
  <Provider store={configureStore()}>
    <div>
      <ConferenceRoom />
    </div>
  </Provider>,
  document.getElementById("app")
);
