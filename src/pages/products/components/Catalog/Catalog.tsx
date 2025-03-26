import { useEffect, useRef, useState } from 'react';

//styles
import styles from './catalog.module.scss';

// components
import Input from 'components/Input';
import Button from 'components/Button';
import MultiDropdown from 'components/MultiDropdown';
import Text from 'components/Text';
import Card from 'components/Card';

import ArrowRightIcon from 'components/icons/ArrowRightIcon';
import { Link } from 'react-router';
import { routes } from 'config/routes';

import { fetchProducts } from 'config/apiRequests';

const Catalog = () => {
  //Интерфейс для состояния с товарами
  interface IProducts {
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

  const catalogRef = useRef<HTMLDivElement>(null);

  const [products, setProducts] = useState<IProducts[]>([]);
  const [page, setPage] = useState<number>(1);
  const productsPerPage = 12;

  useEffect(() => {
    fetchProducts().then((data) => setProducts(data));
  }, []);

  const handleChange = () => {};

  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <div className={styles.catalog}>
      <div className={styles.catalogHeader} ref={catalogRef}>
        <div className={styles.search}>
          <Input value="" placeholder="Search product" onChange={() => {}} />
          <Button>Find now</Button>
        </div>
        <div className={styles.filter}>
          <MultiDropdown
            options={[
              { key: '1', value: 'Тест' },
              { key: '2', value: 'Тест' },
            ]}
            value={[]}
            onChange={handleChange}
            getTitle={() => {
              return 'Filter';
            }}
          />
        </div>
        <div className={styles.totalProducts}>
          <Text view="subtitle" weight="bold">
            Total products
          </Text>
          <Text view="p-20" weight="bold" color="accent">
            {products.length}
          </Text>
        </div>
      </div>
      <div className={styles.catalogBody}>
        {currentProducts &&
          currentProducts.slice(0, 12).map((product) => (
            <Link to={routes.product.create(product.documentId)} key={product.documentId}>
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
      <div className={styles.pagination}>
        <ArrowRightIcon
          width={35}
          height={35}
          color={page === 1 ? 'secondary' : 'primary'}
          style={{ rotate: '180deg' }}
          onClick={
            page === 1
              ? undefined
              : () => {
                  setPage((prev) => prev - 1);
                  setTimeout(() => {
                    catalogRef.current?.scrollIntoView({
                      block: 'start',
                      behavior: 'smooth',
                    });
                  }, 0);
                }
          }
        />
        <button
          onClick={() => {
            setPage(1);
            setTimeout(() => {
              catalogRef.current?.scrollIntoView({
                block: 'start',
                behavior: 'smooth',
              });
            }, 0);
          }}
          className={`${styles.pageSelector} ${page === 1 ? styles.active : ''}`}
        >
          1
        </button>
        {page > 3 && <span className={styles.ellipsis}>...</span>}
        {Array.from({ length: totalPages })
          .map((_, i) => i + 1)
          .filter((p) => (p >= page - 1 && p <= page + 1) || p === totalPages)
          .filter((p) => p > 1 && p < totalPages)
          .map((p) => (
            <button
              key={p}
              onClick={() => {
                setPage(p);
                setTimeout(() => {
                  catalogRef.current?.scrollIntoView({
                    block: 'start',
                    behavior: 'smooth',
                  });
                }, 0);
              }}
              className={`${styles.pageSelector} ${page === p ? styles.active : ''}`}
            >
              {p}
            </button>
          ))}
        {page < totalPages - 2 && <span className={styles.ellipsis}>...</span>}
        {totalPages > 1 && (
          <button
            onClick={() => {
              setPage(totalPages);
              setTimeout(() => {
                catalogRef.current?.scrollIntoView({
                  block: 'start',
                  behavior: 'smooth',
                });
              }, 0);
            }}
            className={`${styles.pageSelector} ${page === totalPages ? styles.active : ''}`}
          >
            {totalPages}
          </button>
        )}

        <ArrowRightIcon
          width={35}
          height={35}
          color={page === totalPages ? 'secondary' : 'primary'}
          onClick={
            page === totalPages
              ? undefined
              : () => {
                  setPage((prev) => prev + 1);
                  setTimeout(() => {
                    catalogRef.current?.scrollIntoView({
                      block: 'start',
                      behavior: 'smooth',
                    });
                  }, 0);
                }
          }
        />
      </div>
    </div>
  );
};

export default Catalog;
