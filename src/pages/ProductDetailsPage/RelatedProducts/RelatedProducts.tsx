import { observer } from 'mobx-react-lite';
import { Link } from 'react-router';
import Button from 'components/Button';
import Card from 'components/Card';
import Text from 'components/Text';
import { routes } from 'config/routes';
import productStore from 'store/ProductStore';
import IProducts from 'types/IProducts';
import styles from './relatedProducts.module.scss';

const RelatedProducts = observer(({ product }: { product: IProducts }) => {
  const relatedProducts = productStore.getRelatedProducts(product);

  // Если нет связанных товаров — не рендерим блок вообще
  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <div className={styles.relatedProducts}>
      <Text view="title">Related Items</Text>
      <div className={styles.relatedCards}>
        {relatedProducts.slice(0, 3).map((product) => (
          <Link
            to={routes.product.create(product.documentId)}
            key={product.documentId}
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
});

export default RelatedProducts;