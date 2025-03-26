import React from 'react';
import cn from 'classnames';
import CheckIcon from '../icons/CheckIcon';
import styles from './CheckBox.module.css';
import '../variables.css';

export type CheckBoxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  /** Вызывается при клике на чекбокс */
  onChange: (checked: boolean) => void;
};

const CheckBox: React.FC<CheckBoxProps> = ({ checked, onChange, disabled, className, ...props }) => {
  return (
    <label className={cn(styles.checkbox, className, disabled && styles.checkboxDisabled)}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => {
          onChange(e.target.checked);
        }}
        disabled={disabled}
        className={styles.input}
        {...props}
      />
      {checked && <CheckIcon className={styles.icon} width={40} height={40} color="accent" />}
    </label>
  );
};

export default CheckBox;
