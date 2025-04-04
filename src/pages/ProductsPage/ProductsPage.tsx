import { observer } from 'mobx-react-lite';
import Catalog from './Catalog';
import Filter from './Filter';
import ProductsCaption from './ProductsCaption';
import Search from './Search';

const ProductsPage = observer(() => {

  return (
    <>
      <ProductsCaption />
      <Search />
      <Filter />
      <Catalog />
    </>
  );
});

export default ProductsPage;