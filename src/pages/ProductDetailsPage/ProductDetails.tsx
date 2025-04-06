import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import Text from 'components/Text';
import ArrowRightIcon from 'components/icons/ArrowRightIcon';
import { useGetProduct } from 'utils/useGetProduct';
import ProductDetailCard from './ProductDetailCard';
import RelatedProducts from './RelatedProducts';
import styles from './productDetails.module.scss';

const ProductDetails = observer(() => {
  const navigate = useNavigate();
  const { id, product } = useGetProduct();

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 50);
  }, [id]);

  return (
    <div className={styles.productDetails}>
      <div className={styles.toCatalog} onClick={() => navigate(-1)}>
        <ArrowRightIcon color="primary" width={32} height={32} viewBox='0 0 32 32' style={{ rotate: '180deg' }} />
        <Text view="p-20">Назад</Text>
      </div>
      {product && <ProductDetailCard product={product} />}
      {product && <RelatedProducts product={product} />}
    </div>
  );
});

export default ProductDetails;
