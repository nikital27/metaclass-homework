import { runInAction } from 'mobx';
import { useEffect } from 'react';
import productStore from 'store/ProductStore';
import { Meta } from 'utils/meta';

const useProducts = () => {
  useEffect(() => {
    productStore.fetchProducts(1);
  }, []);

  const fetchMoreData = () => {
    runInAction(() => {
      if (productStore.state !== Meta.loading && productStore.products.length < productStore.meta.total) {
        productStore.fetchProducts(productStore.meta.page + 1);
      }
    });
  };

  return { fetchMoreData };
};

export default useProducts;
