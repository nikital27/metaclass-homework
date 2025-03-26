import { useNavigate, useParams } from 'react-router';
import styles from './productDetails.module.scss';
import ArrowRightIcon from 'components/icons/ArrowRightIcon';
import Text from 'components/Text';
import ProductDetailCard from './components/ProductDetailCard';
import { routes } from 'config/routes';
import RelatedProducts from './components/RelatedProducts';
import { useEffect, useRef, useState } from 'react';
import { fetchSingleProduct } from 'config/apiRequests';

const ProductDetails = () => {
  const { id } = useParams();

  const productId = id;

  const navigate = useNavigate();

  interface IProduct {
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
  }

  const [product, setProduct] = useState<IProduct>();

  const productDetailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchSingleProduct(productId).then((data) => setProduct(data));
  }, [productId]);

  return (
    <div className={styles.productDetails} ref={productDetailRef}>
      <div className={styles.toCatalog} onClick={() => navigate(routes.products.create())}>
        <ArrowRightIcon color="primary" width={32} height={32} style={{ rotate: '180deg' }} />
        <Text view="p-20">Назад</Text>
      </div>
      {product && <ProductDetailCard product={product} />}
      {product && <RelatedProducts product={product} productDetailRef={productDetailRef} />}
    </div>
  );
};

export default ProductDetails;
