import { combineReducers } from 'redux';
import { cartReducer } from './burger.js';
import { authReducer } from './authorization.js';

export const rootReducer = combineReducers({cartReducer, authReducer}); 
