import cn from 'classnames';
import React from 'react';
import Text from '../Text/index';

import styles from './Card.module.css';
import '../variables.css';

export type CardProps = {
  /** Дополнительный classname */
  className?: string;
  /** URL изображения */
  image: string;
  /** Слот над заголовком */
  captionSlot?: React.ReactNode;
  /** Заголовок карточки */
  title: React.ReactNode;
  /** Описание карточки */
  subtitle: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  contentSlot?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
  /** Слот для действия */
  actionSlot?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({
  className,
  image,
  captionSlot,
  title,
  subtitle,
  contentSlot,
  onClick,
  actionSlot,
}) => (
  <div className={cn(styles.card, className)} onClick={onClick}>
    <img className={styles.cardImage} src={image} alt={typeof title === 'string' ? title : ''} />
    <div className={styles.cardContent}>
      {captionSlot && <div className={styles.cardContentCaption}>{captionSlot}</div>}
      <Text className={styles.cardContentTitle} view="p-20" weight="medium" maxLines={2}>
        {title}
      </Text>
      <Text className={styles.cardContentSubtitle} view="p-16" color="secondary" maxLines={3}>
        {subtitle}
      </Text>
      <div className={styles.cardFooter}>
        <Text view="p-18" weight="bold">
          {contentSlot}
        </Text>
        {actionSlot}
      </div>
    </div>
  </div>
);

export default Card;
