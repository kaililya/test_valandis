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

// Пример использования:
const productList = [
  { brand: 'Brand A', id: '001', price: 50, product: 'Product A' },
  { brand: 'Brand B', id: '002', price: 60, product: 'Product B' },
  { brand: 'Brand A', id: '001', price: 55, product: 'Product A' },
  { brand: 'Brand C', id: '003', price: 70, product: 'Product C' },
  { brand: 'Brand D', id: '004', price: 80, product: 'Product D' },
  { brand: 'Brand E', id: '002', price: 65, product: 'Product B' },
];

