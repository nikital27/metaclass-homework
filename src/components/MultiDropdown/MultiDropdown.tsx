import cn from 'classnames';
import { useRef, useState } from 'react';
import ArrowDownIcon from 'components/icons/ArrowDownIcon';
import { useOnClickOutside } from 'utils/useOnClickOutside';
import Input from '../Input';
import OptionItem from './OptionItem';

import styles from './MultiDropdown.module.scss';

export type Option = {
  key: string;
  value: string;
};

export type MultiDropdownProps = {
  className?: string;
  options: Option[];
  value: Option[];
  onChange: (value: Option[]) => void;
  disabled?: boolean;
  getTitle: (value: Option[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  className,
  options,
  value,
  onChange,
  disabled,
  getTitle,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(dropdownRef, () => setIsOpen(false));

  const handleInputChange = (value: string) => setFilter(value);

  const handleOptionChange = (option: Option, checked: boolean) => {
    if (checked) {
      onChange([...value, option]);
    } else {
      onChange(value.filter((v) => v !== option));
    }
  };

  const filteredOptions = options.filter((option) => 
    option.value.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div ref={dropdownRef} className={cn(styles.dropdown, className)} {...props}>
      <Input
        type="text"
        onFocus={() => setIsOpen(true)}
        value={isOpen ? filter : value.length ? getTitle(value) : ''}
        placeholder={getTitle(value)}
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
              checked={value.includes(option)}
              onChange={handleOptionChange}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiDropdown;