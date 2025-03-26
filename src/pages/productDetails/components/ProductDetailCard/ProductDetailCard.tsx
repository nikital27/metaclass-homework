import { useState } from 'react';
import styles from './productDetailCard.module.scss';
import Text from 'components/Text';
import Button from 'components/Button';
import ArrowRightIcon from 'components/icons/ArrowRightIcon';

type ProductProps = {
  id: number;
  documentId: string;
  title: string;
  images: [{ id: number; url: string }];
  price: number;
  productCategory: {
    id: number;
    title: string;
  };
  description: string;
};

const ProductDetailCard = ({ product }: { product: ProductProps }) => {
  const [imageIndex, setImageIndex] = useState<number>(0);

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
          <ArrowRightIcon width={35} height={35} style={{ rotate: '180deg' }} />
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
          <ArrowRightIcon width={35} height={35} />
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
};

export default ProductDetailCard;
