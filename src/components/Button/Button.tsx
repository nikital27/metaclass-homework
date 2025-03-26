import cn from 'classnames';
import React from 'react';
import Loader from '../Loader';

import styles from './Button.module.css';
import '../variables.css';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Состояние неактивности */
  disabled?: boolean | string;
  /** Текст кнопки */
  children: React.ReactNode;
  /** Дополнительный класс */
  className?: string;
};

const Button: React.FC<ButtonProps> = React.memo(({ loading, children, className, disabled, ...props }) => (
  <button
    className={cn(className, styles.button, loading && !disabled && styles.buttonLoading)}
    disabled={disabled !== undefined ? disabled : loading}
    {...props}
  >
    {loading && <Loader className={styles.buttonLoading} size="s" />}
    {children}
  </button>
));

export default Button;
