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

export default IProducts;
