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
import { Link, useSearchParams } from 'react-router';
import { routes } from 'config/routes';
import Loader from 'components/Loader';
import { fetchProducts } from 'config/apiRequests';

const Catalog = () => {
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
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const productsPerPage = 12;
  const pageCount = Math.round(totalProducts / productsPerPage);

  const [searchParams, setSearchParams] = useSearchParams();

  const initialPage = parseInt(searchParams.get('page') || '1', 10);
  const [page, setPage] = useState<number>(initialPage);

  useEffect(() => {

    fetchProducts(page).then((res) => {setProducts(res.data); setTotalProducts(res.meta.pagination.total)})
    setSearchParams({page: page.toString()});
  }, [page, setSearchParams]);

  const handleChange = () => {};

  const handlePageChange = (newPage: number) => {
    catalogRef.current?.scrollIntoView({block:'start', behavior:'smooth'})
    setTimeout(() => {
      setPage(newPage);
    }, 50);
    
  };

  return (
    <div className={styles.catalog} >
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
          {totalProducts !== 0 ? (
            <Text view="p-20" weight="bold" color="accent">
              {totalProducts}
            </Text>
          ) : (
            <Loader size="m" className={styles.loadingRotating} />
          )}
        </div>
      </div>
      <div className={styles.catalogBody}>
        {products &&
          products.map((product) => (
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
                  handlePageChange(page - 1)
                }
          }
        />
        {Array.from({ length: pageCount }).map((_, index) => {
          const pageNumber = index + 1;
          return (
            <button
              className={`${styles.pageSelector} ${page === pageNumber ? styles.active : ''}`}
              onClick={() => {
                handlePageChange(pageNumber)
                
              }}
              key={pageNumber}
            >
              {pageNumber}
            </button>
          );
        })}
         <ArrowRightIcon
          width={35}
          height={35}
          color={page === pageCount ? 'secondary' : 'primary'}
          onClick={
            page === pageCount
              ? undefined
              : () => {
                handlePageChange(page + 1)
                }
          }
        />
      </div>
    </div>
  );
};

export default Catalog;
