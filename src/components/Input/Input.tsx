import cn from 'classnames';
import React, { useEffect, useState } from 'react';

import styles from './Input.module.css';
import '../variables.css';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, afterSlot, className, ...props }, ref) => {
    const [inputValue, setInputValue] = useState(value);

    useEffect(() => {
      setInputValue(value);
    }, [value]);

    return (
      <div className={cn(styles.input, className)}>
        <input
          type="text"
          className={styles.inputField}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            onChange(e.target.value);
          }}
          ref={ref}
          {...props}
        />
        <div className={styles.inputIcon}>{afterSlot}</div>
      </div>
    );
  },
);

export default Input;
