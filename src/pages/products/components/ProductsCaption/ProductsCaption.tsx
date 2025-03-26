import Text from 'components/Text';
import styles from './productsCaption.module.scss';

const ProductsCaption = () => {
  return (
    <div className={styles.productsCaption}>
      <Text view="title" weight="bold">
        Products
      </Text>
      <Text view="p-20" color="secondary">
        We display products based on the latest products we have, if you want to see our old products please enter the
        name of the item
      </Text>
    </div>
  );
};

export default ProductsCaption;
