import { makeAutoObservable, reaction, runInAction } from 'mobx';
import { fetchProducts } from 'config/api/products';
import rootStore from 'store/RootStore';
import IProducts from 'types/IProducts';
import { Meta } from 'utils/meta';

class ProductStore {
  products: IProducts[] = [];
  meta = {
    total: 0,
    page: 1
  };
  state:Meta = Meta.initial

  constructor() {
    makeAutoObservable(this);
    this.setupSearch();
  }

  private setupSearch() {
    reaction(
      () => ({
        search: rootStore.query.getParam('search') as string | undefined,
        category: rootStore.query.getParam('category') as string | undefined
      }),
      ({ search, category }) => {
        this.fetchProducts(1, search, category);
      }
    );
  }

  async fetchProducts(page = 1, searchParams?: string, categoryParams?: string) {
    this.state = Meta.loading

    try {
      const response = await fetchProducts(page, 10, searchParams, categoryParams);
      const newProducts = response.data || [];

      runInAction(() => {
        if (page === 1 || searchParams || categoryParams) {
          this.products = newProducts;
        } else {
          this.products = [...this.products, ...newProducts];
        }
        this.meta = {
          total: response.meta.pagination.total,
          page: page
        };

        this.state = Meta.success
      });
    } catch (error) {
      runInAction(() => {
        this.state = Meta.error;
      });
    }
  }
}

const productStore = new ProductStore();
export default productStore;
