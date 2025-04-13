import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import Dropdown from "components/Dropdown";
import useCategoryFilter from "utils/useCategoryFilter";

import styles from './Filter.module.scss';

const Filter = observer(() => {
    const {
        categoryOptions,
        selectedCategory,
        handleCategoryChange,
        initializeCategory
    } = useCategoryFilter();

    useEffect(() => {
        initializeCategory();
    }, []);

    return (
        <div className={styles.filter}>
            <Dropdown
                options={categoryOptions}
                value={selectedCategory}
                onChange={handleCategoryChange}
                getTitle={(option) => option?.value || 'Выберите категорию'}
            />
        </div>
    );
});

export default Filter;