import { useCallback, useState } from 'react';
import { useSearchParams } from 'react-router';

const useSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearchValue = searchParams.get('search') || '';
  const [searchValue, setSearchValue] = useState(initialSearchValue);98

  const updateSearchParams = useCallback(
    (value: string) => {
      const newSearch = value.trim();
      const params = new URLSearchParams(searchParams);

      if (newSearch) {
        params.set('search', newSearch);
      } else {
        params.delete('search');
      }
      setSearchParams(params);
    },
    [searchParams, setSearchParams]
  );

  const handleSearch = useCallback(() => {
    updateSearchParams(searchValue);
  }, [searchValue, updateSearchParams]);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        updateSearchParams(searchValue);
      }
    },
    [searchValue, updateSearchParams]
  );

  return {
    searchValue,
    setSearchValue,
    handleSearch,
    handleKeyPress
  };
};

export default useSearch;
