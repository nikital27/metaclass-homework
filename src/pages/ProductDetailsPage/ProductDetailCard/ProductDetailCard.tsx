import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import Button from 'components/Button';
import Text from 'components/Text';
import ArrowRightIcon from 'components/icons/ArrowRightIcon';
import IProducts from 'types/IProducts';
import styles from './productDetailCard.module.scss';

const ProductDetailCard = observer(({ product }: { product: IProducts }) => {
  const [imageIndex, setImageIndex] = useState<number>(0);

  useEffect(() => {
    setImageIndex(0)
  }, [product])


  return (
    <div className={styles.productDetailCard}>
      <div className={styles.imageSlider}>
        <div
          className={styles.sliderRight}
          onClick={
            imageIndex === 0
              ? undefined
              : () => {
                setImageIndex((prev) => prev - 1);
              }
          }
        >
          <ArrowRightIcon width={35} height={35} viewBox='0 0 35 35' style={{ rotate: '180deg' }} />
        </div>
        <img src={`${product?.images[imageIndex].url}`} alt="" />
        <div
          className={styles.sliderLeft}
          onClick={
            imageIndex + 1 === product?.images.length
              ? undefined
              : () => {
                setImageIndex((prev) => prev + 1);
              }
          }
        >
          <ArrowRightIcon width={35} height={35} viewBox='0 0 35 35' />
        </div>
      </div>
      <div className={styles.productInfo}>
        <Text tag="h1" view="title">
          {product?.title}
        </Text>
        <Text view="p-20" color="secondary">
          {product?.description}
        </Text>
        <Text view="title" tag="h2">{`$${product?.price}`}</Text>
        <div className={styles.actions}>
          <Button>Buy Now</Button>
          <Button>Add to Cart</Button>
        </div>
      </div>
    </div>
  );
});

export default ProductDetailCard;
