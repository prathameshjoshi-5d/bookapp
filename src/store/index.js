import { createStore, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
// import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import rootReducer from "../reducers";
import rootSaga from '../sagas/rootSaga';

// const initialState = {};
const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware,logger];

// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage,
//   whitelist: [
//     'auth',
//   ]
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  // persistedReducer,
  rootReducer,
  // initialState,
  compose(
    applyMiddleware(sagaMiddleware),
    // window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  )
);

// const persistor = persistStore(store);
sagaMiddleware.run(rootSaga);

// export { store, persistor };
export { store };
