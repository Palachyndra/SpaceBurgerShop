import { combineReducers } from 'redux';
import { cartReducer } from './burger';
import { authReducer } from './authorization';
import { wsReducer } from './ws';


export const rootReducer = combineReducers({ cartReducer, authReducer, wsReducer }); 
