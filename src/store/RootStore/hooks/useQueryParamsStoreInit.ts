import { useEffect } from 'react';
import { useLocation } from 'react-router';
import rootStore from '../instance';

export const useQueryParamsStoreItin = (): void => {
  const { search } = useLocation();

  useEffect(() => {
    rootStore.query.setSearch(search);
  }, [search]);
};
