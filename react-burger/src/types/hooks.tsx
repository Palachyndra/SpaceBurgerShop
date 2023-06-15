import {Action, ActionCreator, Dispatch} from "redux";
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from 'react-redux';
import type { } from 'redux-thunk/extend-redux';
import { rootReducer } from '../services/reducers';
import { TItems } from '../services/actions/burger';
import { TAuth } from '../services/actions/authorization';
import { TWS } from '../services/actions/ws';

type RootState = ReturnType<typeof rootReducer>;

type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TItems>
>;

export type AppDispatch = Dispatch<TItems>;

type DispatchFunc = () => AppDispatch | AppThunk;

export const useDispatch: DispatchFunc = dispatchHook;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;