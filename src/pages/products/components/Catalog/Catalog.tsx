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

import axios from 'axios';
import qs from 'qs'

//import { fetchProducts } from 'config/apiRequests';
import Loader from 'components/Loader';

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
  const [totalProducts, setTotalProducts] = useState<number>(0)
  const productsPerPage = 12;

  useEffect(() => {
    const token =
    'f53a84efed5478ffc79d455646b865298d6531cf8428a5e3157fa5572c6d3c51739cdaf3a28a4fdf8b83231163075ef6a8435a774867d035af53717fecd37bca814c6b7938f02d2893643e2c1b6a2f79b3ca715222895e8ee9374c0403d44081e135cda1f811fe7cfec6454746a5657ba070ec8456462f8ca0e881232335d1ef';
  
  const fetchProducts = async () => {
    const query = qs.stringify({
      populate: ['images', 'productCategory'],
    });
  
    const response = await axios.get(`
https://front-school-strapi.ktsdev.ru/api/products?populate[0]=images&populate[1]=productCategory&pagination[pageSize]=12&pagination[page]=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {setProducts(res.data.data);setTotalProducts(res.data.meta.pagination.total)})
  };

  fetchProducts();
  }, [])

  // useEffect(() => {
  //   fetchProducts().then((data) => setProducts(data));
  // }, []);

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
          {totalProducts !== 0 ? <Text view='p-20' weight='bold' color='accent'>{totalProducts}</Text> : <Loader size='m' className={styles.loadingRotating}/>}
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
