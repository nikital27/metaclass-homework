import cn from 'classnames';
import React from 'react';
import Text from '../Text';
import styles from './Card.module.scss';

export type CardProps = {
  className?: string;
  image?: string;
  captionSlot?: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  contentSlot?: React.ReactNode;
  onClick?: React.MouseEventHandler;
  actionSlot?: React.ReactNode;
  skeleton?: boolean; // Добавлен параметр скелетона
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
  skeleton = false, // По умолчанию false
}) => (
  <div className={cn(styles.card, className, { [styles.skeleton]: skeleton })} onClick={!skeleton ? onClick : undefined}>
    {/* Картинка */}
    <div className={styles.cardImageWrapper}>
      {skeleton ? <div className={styles.skeletonImage} /> : <img className={styles.cardImage} src={image} alt={typeof title === 'string' ? title : ''} />}
    </div>

    {/* Контент карточки */}
    <div className={styles.cardContent}>
      {skeleton ? <div className={styles.skeletonText} /> : captionSlot && <div className={styles.cardContentCaption}>{captionSlot}</div>}

      {skeleton ? <div className={styles.skeletonTitle} /> : (
        <Text className={styles.cardContentTitle} view="p-20" weight="medium" maxLines={2}>
          {title}
        </Text>
      )}

      {skeleton ? <div className={styles.skeletonSubtitle} /> : (
        <Text className={styles.cardContentSubtitle} view="p-16" color="secondary" maxLines={3}>
          {subtitle}
        </Text>
      )}

      <div className={styles.cardFooter}>
        {skeleton ? <div className={styles.skeletonPrice} /> : (
          <Text view="p-18" weight="bold">
            {contentSlot}
          </Text>
        )}

        {skeleton ? <div className={styles.skeletonButton} /> : actionSlot}
      </div>
    </div>
  </div>
);

export default Card;