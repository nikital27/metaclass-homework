import { observer } from 'mobx-react-lite';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router';
import Button from 'components/Button';
import Card from 'components/Card';
import Loader from 'components/Loader';
import Text from 'components/Text';
import ArrowDownIcon from 'components/icons/ArrowDownIcon';
import { routes } from 'config/routes';
import productStore from 'store/ProductStore';
import useProducts from 'utils/useProducts';
import useScrollToTop from 'utils/useScrollToTop';
import styles from './catalog.module.scss';

const Catalog = observer(() => {
  const { showScroll, handleClick } = useScrollToTop();
  const { fetchMoreData } = useProducts();
  const { products, meta, isLoading } = productStore;

  const renderProducts = () => {
    if (products.length === 0) {
      return (
        <>
          <Card skeleton={true} />
          <Card skeleton={true} />
          <Card skeleton={true} />
        </>
      );
    }
    return products.map((e) => (
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
    ));
  };

  const renderTotalProducts = () => (
    <div className={styles.totalProducts}>
      <Text view="subtitle" weight="bold">
        Total products
      </Text>
      {isLoading && <Loader size="s" className={styles.loading} />}
      {!isLoading && meta.total && (
        <Text view="p-20" color="accent" weight="bold">
          {meta.total}
        </Text>
      )}
    </div>
  );

  return (
    <div className={styles.catalog}>
      {renderTotalProducts()}

      <InfiniteScroll
        className={styles.catalogBody}
        style={{ overflow: 'visible' }}
        dataLength={products.length}
        next={fetchMoreData}
        loader={<><Card skeleton={true} /><Card skeleton={true} /></>}
        hasMore={products.length < meta.total}
      >
        {renderProducts()}
      </InfiniteScroll>

      <div
        className={`${styles.scrollToTop} ${showScroll ? styles.visible : ''}`}
        onClick={handleClick}
      >
        <ArrowDownIcon width={30} height={30} />
      </div>
    </div>
  );
});

export default Catalog;