import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from "@reduxjs/toolkit"
import { TGood } from '../../types/types';

type TInitialStateUser = {
  getAllGoods: boolean,
  getAllGoodsSuccess: boolean,
  getAllGoodsFailed: boolean,
  getAllGoodsLength: boolean,
  getAllGoodsLengthSuccess: boolean,
  getAllGoodsLengthFailed: boolean,
  isFilteredRequest: boolean,
  goodsArray: TGood[],
  countOfPage: number | null,
  error: string | unknown
};

const intitialState:TInitialStateUser = {
  goodsArray: [],
  countOfPage: null,
  getAllGoods: false,
  getAllGoodsSuccess: false,
  getAllGoodsFailed: false,
  getAllGoodsLength: false,
  getAllGoodsLengthSuccess: false,
  getAllGoodsLengthFailed: false,
  isFilteredRequest: false,
  error: null,
}

export const catsSlice = createSlice({
  name: 'goods',
  initialState: intitialState,
  reducers: {
    getAllGoods(state) {
      state.getAllGoods = true; 
      state.getAllGoodsSuccess = false; 
      state.getAllGoodsFailed = false; 
      state.error = null;
    },
    getAllGoodsSuccess(state, action:PayloadAction<TGood[]>) {
      state.getAllGoods = false; 
      state.getAllGoodsSuccess = true; 
      state.getAllGoodsFailed = false; 
      state.goodsArray = action.payload;
    },
    getAllGoodsFailed(state, action:PayloadAction<string | unknown>) {
      state.getAllGoods = false; 
      state.getAllGoodsSuccess = false; 
      state.getAllGoodsFailed = true; 
      state.error = action.payload
    },
    getAllGoodsLength(state) {
      state.getAllGoodsLength = true; 
      state.getAllGoodsLengthSuccess = false; 
      state.getAllGoodsLengthFailed = false; 
      state.error = null;
    },
    getAllGoodsLengthSuccess(state, action:PayloadAction<number>) {
      state.getAllGoodsLength = false; 
      state.getAllGoodsLengthSuccess = true; 
      state.getAllGoodsLengthFailed = false; 
      state.countOfPage = action.payload
    },
    getAllGoodsLengthFailed(state, action:PayloadAction<string | unknown>) {
      state.getAllGoodsLength = false; 
      state.getAllGoodsLengthSuccess = false; 
      state.getAllGoodsLengthFailed = true; 
      state.error = action.payload
    },
    setIsFilteredRequest(state, action:PayloadAction<boolean>) {
      state.isFilteredRequest = action.payload
    }
  }
})

type TSliceActions<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => infer A ? A : never;
}[keyof T]

export type TCatActionTypes = TSliceActions<typeof catsSlice.actions>

export const { 
  getAllGoodsFailed,
  getAllGoodsSuccess,
  getAllGoods,
  getAllGoodsLength,
  getAllGoodsLengthSuccess,
  getAllGoodsLengthFailed,
  setIsFilteredRequest
 } = catsSlice.actions;

export default catsSlice.reducer