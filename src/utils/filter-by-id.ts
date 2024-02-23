import { TGood } from "../types/types";

export function removeDuplicateById(products:TGood[]) {
  const idSet = new Set();
  const result = [];
  
  for (const product of products) {
      if (!idSet.has(product.id)) {
          idSet.add(product.id);
          result.push(product);
      }
  }
  
  return result;
}


