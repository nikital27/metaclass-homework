import cn from 'classnames';
import React from 'react';
import Icon, { IconProps } from '../Icon';

import styles from '../Icon/Icon.module.css';


const ArrowDownIcon: React.FC<IconProps> = ({ className, ...props }) => (
  <Icon className={cn(styles.iconNoStroke, className)} {...props}>
    <path d="M2.33563 8.74741L3.66436 7.25259L12 14.662L20.3356 7.25259L21.6644 8.74741L12 17.338L2.33563 8.74741Z" />
  </Icon>
);

export default ArrowDownIcon;
