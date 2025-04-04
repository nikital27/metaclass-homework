
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import MultiDropdown from "components/MultiDropdown";
import { fetchCategories } from "config/api/products";
import { Option } from "types/Options";
import styles from './Filter.module.scss'


const Filter = observer(() => {

    const [options, setOptions] = useState<Option[]>([]);
    const [selectedOptions, setSelectedOtions] = useState<Option[]>([])

    useEffect(() => {
        fetchCategories().then(data => {
            const formattedOptions = data.data.map(category => ({
                key: category.id.toString(),
                value: category.title
            }))
            setOptions(formattedOptions)
        })
    }, [])

    const handleChange = (e) => {
        setSelectedOtions(e)
    }


    return (
        <div className={styles.filter}>
            <MultiDropdown
                options={
                    options
                }
                value={selectedOptions}
                onChange={handleChange}
                getTitle={() =>
                    selectedOptions.length > 0
                        ? selectedOptions.map(o => o.value).join(', ')
                        : 'Filter'
                }
            />
        </div>
    );
})

export default Filter;