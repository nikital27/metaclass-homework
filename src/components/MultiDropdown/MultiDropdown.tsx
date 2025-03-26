import cn from 'classnames';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import Input from '../Input';
import ArrowDownIcon from '../icons/ArrowDownIcon';
import Text from '../Text';

import styles from './MultiDropdown.module.scss';
import '../variables.css';

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
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

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleInputChange = (value: string) => setFilter(value);

  const handleOptionChange = (option: Option, checked: boolean) => {
    if (checked) {
      onChange([...value, option]);
    } else {
      onChange(value.filter((v) => v !== option));
    }
  };

  const filteredOptions = options.filter((option) => option.value.toLowerCase().includes(filter.toLowerCase()));

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

type OptionItemProps = {
  option: Option;
  checked: boolean;
  onChange: (option: Option, checked: boolean) => void;
};

const OptionItem: React.FC<OptionItemProps> = ({ option, checked, onChange }) => (
  <label className={styles.option}>
    <input
      className={styles.checkbox}
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(option, e.target.checked)}
    />
    <Text view="p-16">{option.value}</Text>
  </label>
);

export default MultiDropdown;
