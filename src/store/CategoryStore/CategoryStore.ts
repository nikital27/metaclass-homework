import { fetchCategories } from 'config/api/products';
import { makeAutoObservable, runInAction } from 'mobx';
import Category from 'types/Category';

class CategoryStore {
  categories: Category[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async getCategoriesList() {
    const response = await fetchCategories();

    runInAction(() => {
      this.categories = response.data;
    });
  }
}

export default new CategoryStore();
