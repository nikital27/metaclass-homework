import Text from 'components/Text';
import styles from './relatedProducts.module.scss';
import Card from 'components/Card';
import Button from 'components/Button';

import { RefObject, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { routes } from 'config/routes';
import { fetchSimilarCategory } from 'config/apiRequests';

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

const RelatedProducts = ({
  product,
  productDetailRef,
}: {
  product: ProductProps;
  productDetailRef: RefObject<HTMLDivElement | null>;
}) => {
  const [relatedProducts, setRelatedProducts] = useState<ProductProps[]>([]);

  const relatedProductsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchSimilarCategory(product).then((data: ProductProps[]) =>
      setRelatedProducts(
        data.filter(
          (item) =>
            item.productCategory.title === product.productCategory.title && item.documentId !== product.documentId,
        ),
      ),
    );
  }, [product]);

  return (
    <div className={styles.relatedProducts} ref={relatedProductsRef}>
      <Text view="title">Related Items</Text>
      <div className={styles.relatedCards}>
        {relatedProducts &&
          relatedProducts.slice(0, 3).map((product: ProductProps) => (
            <Link
              to={routes.product.create(product.documentId)}
              key={product.documentId}
              onClick={() => {
                productDetailRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' });
              }}
            >
              <Card
                title={product.title}
                subtitle={product.description}
                image={product.images[0].url}
                contentSlot={`$${product.price}`}
                actionSlot={<Button>Add to cart</Button>}
                captionSlot={product.productCategory.title}
              />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
