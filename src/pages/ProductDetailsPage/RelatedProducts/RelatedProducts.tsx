
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router';
import Button from 'components/Button';
import Card from 'components/Card';
import Text from 'components/Text';
import { routes } from 'config/routes';
import productStore from 'store/ProductStore';
import IProducts from 'types/IProducts';
import styles from './relatedProducts.module.scss';

const RelatedProducts = observer(({
  product,
}: {
  product: IProducts;
}) => {

  const related_products = productStore.products.filter(related_products => related_products.productCategory.id === product.productCategory.id && related_products !== product);


  return (
    <div className={styles.relatedProducts}>
      <Text view="title">Related Items</Text>
      <div className={styles.relatedCards}>
        {related_products &&
          related_products.slice(0, 3).map((product: IProducts) => (
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
