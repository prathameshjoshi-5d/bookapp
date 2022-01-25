import { createStore, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";

import rootReducer from "../reducers";
import rootSaga from '../sagas/rootSaga';
const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();


const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(sagaMiddleware),
  )
);

sagaMiddleware.run(rootSaga);
export { store };
