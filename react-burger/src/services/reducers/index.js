import { combineReducers } from 'redux';
import { cartReducer } from './burger.js';

export const rootReducer = combineReducers({cartReducer}); 
