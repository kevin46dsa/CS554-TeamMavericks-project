import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers/rootReducer';
import logger from 'redux-logger';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const persistConfig = {
	key: 'root',
	version: 1,
	storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(
	persistedReducer,
	composeWithDevTools(applyMiddleware(logger))
);
// const store = createStore(
// 	rootReducer,
// 	composeWithDevTools(applyMiddleware(logger))
// );

export default store;
