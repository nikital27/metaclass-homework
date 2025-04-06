import cn from 'classnames';
import { useRef, useState } from 'react';
import ArrowDownIcon from 'components/icons/ArrowDownIcon';
import { useOnClickOutside } from 'utils/useOnClickOutside';
import Input from '../Input';
import OptionItem from './OptionItem';

import styles from './Dropdown.module.scss'

export type Option = {
  key: string;
  value: string;
};

export type DropdownProps = {
  className?: string;
  options: Option[];
  value: Option | null;
  onChange: (value: Option | null) => void;
  disabled?: boolean;
  getTitle?: (value: Option | null) => string;
};

const Dropdown: React.FC<DropdownProps> = ({
  className,
  options,
  value,
  onChange,
  disabled,
  getTitle = (val) => val?.value || '',
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(dropdownRef, () => setIsOpen(false));

  const handleInputChange = (value: string) => { setFilter(value); };

  const handleOptionClick = (option: Option) => {
    if (option.key !== '0') {
      onChange(option);
      setIsOpen(false);
      setFilter('');
    } else {
      onChange(null)
      setIsOpen(false)
    }

  };

  const filteredOptions = options.filter((option) =>
    option.value.toLowerCase().includes(filter.toLowerCase())
  );

  const inputValue = isOpen ? filter : value ? getTitle(value) : '';

  return (
    <div ref={dropdownRef} className={cn(styles.dropdown, className)} {...props}>
      <Input
        type="text"
        onFocus={() => setIsOpen(true)}
        value={inputValue}
        placeholder={getTitle(null)}
        onChange={handleInputChange}
        className={styles.input}
        afterSlot={<ArrowDownIcon />}
        disabled={disabled}
      />
      {isOpen && !disabled && (
        <div className={styles.options}>
          {filteredOptions.map((option) => (
            <OptionItem
              key={option.key}
              option={option}
              checked={value?.key === option.key}
              onChange={() => handleOptionClick(option)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;