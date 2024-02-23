import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { TAppDispatch } from "../store/store";
import { TRootState } from "../store/store";

export const useAppDispatch = () => useDispatch<TAppDispatch>();
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;