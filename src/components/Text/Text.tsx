import cn from 'classnames';
import React from 'react';

import styles from './Text.module.css';
import '../variables.css';

export type TextProps = {
  /** Дополнительный класс */
  className?: string;
  /** Стиль отображения */
  view?: 'title' | 'subtitle' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
  /** Html-тег */
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
  /** Начертание шрифта */
  weight?: 'normal' | 'medium' | 'bold';
  /** Контент */
  children: React.ReactNode;
  /** Цвет */
  color?: 'primary' | 'secondary' | 'accent';
  /** Максимальное кол-во строк */
  maxLines?: number;
  onClick?: React.MouseEventHandler;
};

const Text: React.FC<TextProps> = ({ className, view, tag, weight, children, color, maxLines, onClick }) => {
  const Tag = tag || 'p';
  const fontWeightMap = {
    normal: 400,
    medium: 500,
    bold: 700,
  };

  const style = {
    fontWeight: fontWeightMap[weight || 'normal'],
    WebkitLineClamp: maxLines,
  };

  return (
    <Tag
      onClick={onClick}
      className={cn(styles.text, styles[`text-${view}`], styles[`text-${color}`], className)}
      style={style}
    >
      {children}
    </Tag>
  );
};

export default Text;
