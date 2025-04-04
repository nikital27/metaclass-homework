import cn from 'classnames';
import React from 'react';
import styles from './Icon.module.scss';

export type IconProps = React.SVGAttributes<SVGElement> & {
  className?: string;
  color?: 'primary' | 'secondary' | 'accent';
  size?: number;
  variant?: 'stroke' | 'fill' | 'both';
  viewBox?: string; // Добавляем возможность кастомизации viewBox
};

const Icon: React.FC<React.PropsWithChildren<IconProps>> = ({
  size = 24,
  color = 'primary',
  variant = 'stroke',
  viewBox = '0 0 24 24',
  className,
  children,
  ...props
}) => (
  <svg
    viewBox={viewBox}
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    className={cn(
      styles.icon,
      styles[`icon--${color}`],
      styles[`icon--${variant}`],
      className
    )}
    {...props}
  >
    {children}
  </svg>
);

export default Icon;