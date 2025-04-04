export const routes = {
  main: {
    mask: '/',
    create: () => '/',
  },
  products: {
    mask: '/',
    create: () => '/',
  },
  product: {
    mask: '/product/:id',
    create: (id: string) => `/product/${id}`,
  },
};
