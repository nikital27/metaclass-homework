import { useEffect } from 'react';
import { useParams } from 'react-router';
import productStore from 'store/ProductStore';

export function useGetProduct() {
  const { id } = useParams();
  useEffect(() => {
    productStore.fetchProducts();
  }, []);
  const { products } = productStore;

  return {
    product: products.find((p) => p.documentId === id),
    id
  };
}
