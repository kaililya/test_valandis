import { configureStore,combineReducers } from '@reduxjs/toolkit';
import goodsReducer , { TCatActionTypes } from './slices/goods-slice'
import { ThunkAction } from 'redux-thunk';

const rootReducer = combineReducers({
  goodsReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  })
};

export type TRootState = ReturnType<typeof rootReducer>;
export type TAppStore = ReturnType<typeof setupStore>;
export type TAppDispatch = TAppStore['dispatch'];

export type TActions = TCatActionTypes 

export type TAppThunk<TReturn = void> = ThunkAction<TReturn, TRootState, never, TActions>;
