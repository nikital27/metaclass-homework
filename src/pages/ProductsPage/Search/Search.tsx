import Button from 'components/Button';
import Input from 'components/Input';
import useSearch from 'utils/useSearch';
import styles from './Search.module.scss';
import { observer } from 'mobx-react-lite';

const Search = observer(() => {
    const {
        searchValue,
        setSearchValue,
        handleSearch,
        handleKeyPress
    } = useSearch();

    return (
        <div className={styles.search}>
            <Input
                value={searchValue}
                placeholder="Найти продукт..."
                onChange={setSearchValue}
                onKeyPress={handleKeyPress}
            />
            <Button onClick={handleSearch}>Find now</Button>
        </div>
    );
});

export default Search;