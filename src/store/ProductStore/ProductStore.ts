import { fetchProducts } from 'config/api/products';
import { makeAutoObservable, runInAction } from 'mobx';
import IProducts from 'types/IProducts';

class ProductStore {
  products: IProducts[] = [];
  meta = {
    total: 0,
    page: 1
  };
  isLoading = false;
  error: string | null = null;
  currentSearch = ''; // Добавляем поле для хранения текущего поискового запроса

  constructor() {
    makeAutoObservable(this);
  }

  async fetchProducts(page = 1, searchParams?: string) {
    this.isLoading = true;
    this.error = null;

    // Если изменился поисковый запрос, сбрасываем страницу и товары
    if (searchParams !== this.currentSearch) {
      page = 1;
      this.products = [];
      this.currentSearch = searchParams || '';
    }

    try {
      const response = await fetchProducts(page, 10, searchParams);

      runInAction(() => {
        // Для поиска заменяем товары, для пагинации - добавляем
        const newProducts = response.data || [];
        this.products = page === 1 || searchParams ? newProducts : [...this.products, ...newProducts];

        this.meta = {
          total: response.meta.pagination.total,
          page: page
        };

        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : 'Unknown error';
        this.isLoading = false;
      });
    }
  }
}

const productStore = new ProductStore();
export default productStore;
