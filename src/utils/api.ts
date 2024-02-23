import axios from "axios";
import { TParams } from "../types/types";
import { makeAccess } from "./make-access";
import { mainURL } from "./constants";
import { useSearchParams } from "react-router-dom";

const defalutHeaders = () => {
  return {
    headers:  {
      "Content-Type": "application/json",
      "X-Auth": makeAccess(),
    },
  }
}

const makeBody = (action: TParams, params?: object) => {
  let body: { action: TParams; params?: object } = {
    action: action,
  };
  
  if (params) {
    body.params = params;
  }

  return JSON.stringify(body)
}

export const getLengthOfDb = () =>  axios.post(
  mainURL,
  makeBody(TParams.GET_IDS),
  defalutHeaders()
);

export const getIds = () =>  {
  const params: { [key: string]: string | number } = {};

  for (const [key, value] of new URLSearchParams(window.location.search).entries()) {
    params[key] = value;
  }
  // @ts-ignore
  const page = parseInt(params.page) === 1 ? 0 : parseInt(params.page) - 1
  return axios.post(
    mainURL,
    makeBody(TParams.GET_IDS, { offset: page*50, limit: 47 }),
    defalutHeaders()
  )
}


export const getItems = (ids: any) => axios.post(
  mainURL,
  makeBody(TParams.GET_ITEMS, { ids: ids.data.result }),
  defalutHeaders()
)

export const getFilteredIds = () => {
  const params: { [key: string]: string | number } = {};

  for (const [key, value] of new URLSearchParams(window.location.search).entries()) {
    params[key] = value;
  }

  delete params.page
  // @ts-ignore
  params.price = parseInt(params.price)

  return axios.post(
    mainURL,
    makeBody(TParams.FILTER, params),
    defalutHeaders()
  )
}
