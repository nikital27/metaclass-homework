import { observer } from 'mobx-react-lite';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import Button from 'components/Button';
import Input from 'components/Input';
import productStore from 'store/ProductStore';
import styles from './Search.module.scss';

const Search = observer(() => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchValue, setSearchValue] = useState('');

    // Восстановление поиска из URL при монтировании
    useEffect(() => {
        const query = searchParams.get('q');
        if (query) {
            setSearchValue(query);
            productStore.fetchProducts(1, query);
        }
    }, []);

    const handleSearch = () => {
        if (searchValue.trim()) {
            setSearchParams({ q: searchValue.trim() });
            productStore.fetchProducts(1, searchValue.trim());
        } else {
            setSearchParams({});
            productStore.fetchProducts(1);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className={styles.search}>
            <Input
                value={searchValue}
                placeholder="Search product"
                onChange={(e) => setSearchValue(e)}
                onKeyPress={handleKeyPress}
            />
            <Button onClick={handleSearch}>Find now</Button>
        </div>
    );
});

export default Search;