import {
  getAllGoods,
  getAllGoodsFailed,
  getAllGoodsLength,
  getAllGoodsLengthFailed,
  getAllGoodsLengthSuccess,
  getAllGoodsSuccess,
  setIsFilteredRequest,
} from "../slices/goods-slice";
import { TAppDispatch } from "../store";
import { pageLimit } from "../../utils/constants";
import { getFilteredIds, getIds, getItems, getLengthOfDb } from "../../utils/api";
import { removeDuplicateById } from "../../utils/filter-by-id";

export const fetchDataThunk = () => async (dispatch: TAppDispatch) => {
  try {
    dispatch(getAllGoods());
    dispatch(setIsFilteredRequest(false))
    const ids = await getIds()
    const items = await getItems(ids)
    dispatch(getAllGoodsSuccess(removeDuplicateById(items.data.result)));
  } catch (e) {
    try {
      dispatch(setIsFilteredRequest(false))
      const ids = await getIds()
      const items = await getItems(ids)
      dispatch(getAllGoodsSuccess(removeDuplicateById(items.data.result)));
    } catch (error) {    
      let message;
      if (error instanceof Error) {
        message = error.message
      }
      dispatch(getAllGoodsFailed(message));
    }
  }
};

export const fetchDataLengthThunk = () => async (dispatch: TAppDispatch) => {
  try {
    dispatch(getAllGoodsLength());
    const lengthOfDb = await getLengthOfDb()
    const countOfPage = Math.ceil(lengthOfDb.data.result.length/pageLimit);
    dispatch(getAllGoodsLengthSuccess(countOfPage));
  } catch (e) {
    try {
      dispatch(getAllGoodsLength());
      const lengthOfDb = await getLengthOfDb()
      const countOfPage = Math.ceil(lengthOfDb.data.result.length/pageLimit);
      dispatch(getAllGoodsLengthSuccess(countOfPage));
    } catch (error) {
      let message;
      if (error instanceof Error) {
        message = error.message
      } 
      dispatch(getAllGoodsLengthFailed(message));
    }
  }
};

export const fetchFilteredDataThunk = () => async (dispatch: TAppDispatch) => {
  try {
    dispatch(getAllGoods());
    const ids = await getFilteredIds()
    const items = await getItems(ids)
    const countOfPage = Math.ceil(ids.data.result.length/pageLimit);
    dispatch(getAllGoodsLengthSuccess(countOfPage));
    dispatch(getAllGoodsSuccess(removeDuplicateById(items.data.result)));
    dispatch(setIsFilteredRequest(true))
  } catch (e) {
    try {
      dispatch(getAllGoods());
      const ids = await getFilteredIds()
      const items = await getItems(ids)
      const countOfPage = Math.ceil(ids.data.result.length/pageLimit);
      dispatch(getAllGoodsLengthSuccess(countOfPage));
      dispatch(getAllGoodsSuccess(removeDuplicateById(items.data.result)));
      dispatch(setIsFilteredRequest(true))
    } catch (error) {
      dispatch(getAllGoodsFailed(e));
    }
  }
};
