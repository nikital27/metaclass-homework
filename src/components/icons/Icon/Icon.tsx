import cn from 'classnames';
import React from 'react';

import styles from './Icon.module.css';
import '../../variables.css';

export type IconProps = React.SVGAttributes<SVGElement> & {
  className?: string;
  color?: 'primary' | 'secondary' | 'accent';
};

const Icon: React.FC<React.PropsWithChildren<IconProps>> = ({
  width = 24,
  height = 24,
  color,
  className,
  children,
  ...props
}) => (
  <svg
    viewBox={`0 0 ${width} ${height}`}
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={cn(styles.icon, styles[`icon-${color}`], className)}
    {...props}
  >
    {children}
  </svg>
);

export default Icon;
