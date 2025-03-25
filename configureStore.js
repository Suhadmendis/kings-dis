import { applyMiddleware, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import ReduxThunk from 'redux-thunk';
import rootReducer from './src/reducers/main'
import AsyncStorage from '@react-native-async-storage/async-storage';
import logger from 'redux-logger'

const persistConfig = {
  key: 'root',
  storage:AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const middlewares = [];

if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`);

  // middlewares.push(logger);
}
middlewares.push(ReduxThunk)

export const store = createStore(persistedReducer, {}, applyMiddleware(...middlewares));
export const persistor = persistStore(store)
