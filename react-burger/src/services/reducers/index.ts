import { combineReducers } from 'redux';
import { cartReducer } from './burger';
import { authReducer } from './authorization';

export const rootReducer = combineReducers({ cartReducer: cartReducer, authReducer: authReducer }); 
