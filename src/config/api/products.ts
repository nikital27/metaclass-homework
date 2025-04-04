import Api from './Api';

export type ProductProps = {
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

const defaultPopulate = ['images', 'productCategory'];

export const fetchProducts = async (page = 1, pageSize = 10, searchParams?: string) => {
  const response = await Api.get('/products', {
    params: {
      populate: defaultPopulate,
      'pagination[page]': page,
      'pagination[pageSize]': pageSize,
      filters: {
        title: {
          $containsi: searchParams
        }
      }
    }
  });
  return response.data;
};

export const fetchCategories = async () => {
  const response = await Api.get('product-categories');

  return response.data;
};

export const fetchSingleProduct = async (documentId: string) => {
  const response = await Api.get(`/products/${documentId}`, {
    params: { populate: defaultPopulate }
  });
  return response.data.data;
};

export const fetchSimilarProducts = async (product: ProductProps) => {
  const response = await Api.get('/products', {
    params: { populate: defaultPopulate }
  });

  return response.data.data.filter(
    (item: ProductProps) =>
      item.productCategory.title === product.productCategory.title && item.documentId !== product.documentId
  );
};
