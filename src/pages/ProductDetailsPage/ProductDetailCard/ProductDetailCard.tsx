import { observer } from 'mobx-react-lite';
import Text from 'components/Text';
import Button from 'components/Button';
import ImageSlider from './ImageSlider';
import styles from './productDetailCard.module.scss';
import IProducts from 'types/IProducts';

interface ProductDetailCardProps {
  product: IProducts;
}

const ProductDetailCard = observer(({ product }: ProductDetailCardProps) => {
  return (
    <div className={styles.productDetailCard}>
      <div className={styles.imageContainer}>
        <ImageSlider images={product.images} key={product.id} />
      </div>

      <div className={styles.productInfo}>
        <Text tag="h1" view="title">
          {product.title}
        </Text>

        <Text view="p-20" color="secondary">
          {product.description}
        </Text>

        <Text view="title" tag="h2">
          ${product.price}
        </Text>

        <div className={styles.actions}>
          <Button>Buy Now</Button>
          <Button>Add to Cart</Button>
        </div>
      </div>
    </div>
  );
});

export default ProductDetailCard;