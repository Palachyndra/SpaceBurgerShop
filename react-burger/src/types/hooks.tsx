import { ThunkAction } from 'redux-thunk';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from 'react-redux';
import type { } from 'redux-thunk/extend-redux';
import { rootReducer } from '../services/reducers';
import { TItems } from '../services/actions/burger';
import { TAuth } from '../services/actions/authorization';

type RootState = ReturnType<typeof rootReducer>;
type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  TItems | TAuth
>;

export type AppDispatch<TReturnType = void> = (
  action: TItems
) => TReturnType | TAuth | AppThunk<TReturnType>;

export const useDispatch: () => AppDispatch = dispatchHook;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;