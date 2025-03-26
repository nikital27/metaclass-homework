import cn from 'classnames';
import React from 'react';
import Icon, { IconProps } from '../Icon';

import styles from '../Icon/Icon.module.css';

const CheckIcon: React.FC<IconProps> = ({ className, ...props }) => (
  <Icon className={cn(styles.iconNoFill, className)} {...props}>
    <path d="M4 11.6129L9.87755 18L20 7" strokeWidth="2" />
  </Icon>
);

export default CheckIcon;
