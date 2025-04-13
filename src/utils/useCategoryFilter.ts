import { runInAction } from 'mobx';
import { useState } from 'react';
import { useSearchParams } from 'react-router';
import CategoryStore from 'store/CategoryStore';
import { Option } from 'types/Options';

const useCategoryFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<Option | null>(null);

  const { categories } = CategoryStore;
  const ALL_CATEGORIES = { key: '0', value: 'Все категории' };

  const categoryOptions = [
    ALL_CATEGORIES,
    ...categories.map((category) => ({
      key: category.id.toString(),
      value: category.title
    }))
  ];

  const handleCategoryChange = (option: Option | null) => {
    const newParams = new URLSearchParams(searchParams);

    if (!option || option.key === ALL_CATEGORIES.key) {
      setSelectedCategory(null);
      newParams.delete('category');
    } else {
      setSelectedCategory(option);
      newParams.set('category', option.key);
    }

    setSearchParams(newParams);
  };

  const initializeCategory = async () => {
    await runInAction(async () => {
      await CategoryStore.getCategoriesList();
    });

    const categoryParam = searchParams.get('category');
    if (!categoryParam) return;

    const category = categories.find((c) => c.id.toString() === categoryParam);
    setSelectedCategory(category ? { key: category.id.toString(), value: category.title } : null);
  };

  return {
    categoryOptions,
    selectedCategory,
    handleCategoryChange,
    initializeCategory
  };
};

export default useCategoryFilter;
