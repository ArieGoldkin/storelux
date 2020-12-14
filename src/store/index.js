import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import axios from "axios";

import rootReducer from "./reducers";
import rootSagas from "./sagas";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(rootSagas);

export default store;
