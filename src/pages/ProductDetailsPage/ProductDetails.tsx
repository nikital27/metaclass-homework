import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Text from 'components/Text';
import ArrowRightIcon from 'components/icons/ArrowRightIcon';
import { fetchSingleProduct } from 'config/api/products';
import { routes } from 'config/routes';
import IProducts from 'types/IProducts';
import ProductDetailCard from './ProductDetailCard';
import RelatedProducts from './RelatedProducts';
import styles from './productDetails.module.scss';

const ProductDetails = () => {
  const { id } = useParams();

  const productId = id;

  const navigate = useNavigate();


  const [product, setProduct] = useState<IProducts>();

  const productDetailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchSingleProduct(productId).then((data) => setProduct(data));
  }, [productId]);

  return (
    <div className={styles.productDetails} ref={productDetailRef}>
      <div className={styles.toCatalog} onClick={() => navigate(routes.products.create())}>
        <ArrowRightIcon color="primary" width={32} height={32} viewBox='0 0 32 32' style={{ rotate: '180deg' }} />
        <Text view="p-20">Назад</Text>
      </div>
      {product && <ProductDetailCard product={product} />}
      {product && <RelatedProducts product={product} productDetailRef={productDetailRef} />}
    </div>
  );
};

export default ProductDetails;
