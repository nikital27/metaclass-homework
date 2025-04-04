import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link, useSearchParams } from 'react-router';
import Button from 'components/Button';
import Card from 'components/Card';
import Loader from 'components/Loader';
import Text from 'components/Text';
import ArrowDownIcon from 'components/icons/ArrowDownIcon';
import { routes } from 'config/routes';
import productStore from 'store/ProductStore';
import styles from './catalog.module.scss';

const Catalog = observer(() => {
  const [showScroll, setShowScroll] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const query = searchParams.get('q');

    productStore.fetchProducts(1, query || undefined);

    const handleScroll = () => {
      setShowScroll(window.scrollY > 800);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [searchParams]);

  const fetchMoreData = () => {
    if (!productStore.isLoading && productStore.products.length < productStore.meta.total) {
      productStore.fetchProducts(
        productStore.meta.page + 1,
        productStore.currentSearch // Передаем текущий поисковый запрос
      );
    }
  };

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  return (
    <div className={styles.catalog}>
      <div className={styles.totalProducts}>
        <Text view="subtitle" weight="bold">
          Total products
        </Text>
        {productStore.isLoading && (<Loader size='s' className={styles.loading} />)}
        {!productStore.isLoading && productStore.meta.total && (
          <Text view='p-20' color='accent' weight='bold'>{productStore.meta.total}</Text>
        )}
      </div>

      <InfiniteScroll
        className={styles.catalogBody}
        style={{ overflow: 'visible' }}
        dataLength={productStore.products.length}
        next={fetchMoreData}
        loader={<><Card skeleton={true} /><Card skeleton={true} /></>}
        hasMore={productStore.products.length < productStore.meta.total}
      >
        {productStore.products.length !== 0 ? productStore.products.map((e) => (
          <Link to={routes.product.create(e.documentId)} key={e.documentId}>
            <Card
              image={e.images[0].url}
              title={e.title}
              subtitle={e.description}
              captionSlot={e.productCategory.title}
              actionSlot={<Button>Add to Cart</Button>}
              contentSlot={`$${e.price}`}
            />
          </Link>
        )) : <><Card skeleton={true} /><Card skeleton={true} /><Card skeleton={true} /></>}
      </InfiniteScroll>

      <div className={`${styles.scrollToTop} ${showScroll ? styles.visible : ''}`} onClick={handleClick}>
        <ArrowDownIcon width={30} height={30} />
      </div>
    </div>
  )
});

export default Catalog;