import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/products',
      name: 'home-products',
      component: () => import('./components/product/ProductHome.vue'),
    },
    {
      path: '/products/all',
      name: 'all-products',
      component: () => import('./components/product/ProductList.vue'),
    },
    {
      path: '/products/add',
      name: 'add-product',
      component: () => import('./components/product/AddProduct.vue'),
    },
    {
      path: '/products/edit/:id',
      name: 'edit-product',
      component: () => import('./components/product/EditProduct.vue'),
      props: true,
    },
    {
      path: '/products/search',
      name: 'search-products',
      component: () => import('./components/product/ProductSearch.vue'),
    },
    {
      path: '/customers',
      name: 'home-customers',
      component: () => import('./components/customer/CustomerHome.vue'),
    },
    {
      path: '/customers/search',
      name: 'search-customers',
      component: () => import('./components/customer/CustomerSearch.vue'),
    },
    {
      path: '/customers/all',
      name: 'all-customers',
      component: () => import('./components/customer/CustomerList.vue'),
    },
    {
      path: '/customers/add',
      name: 'add-customer',
      component: () => import('./components/customer/AddCustomer.vue'),
    },
    {
      path: '/customers/edit/:id',
      name: 'edit-customer',
      component: () => import('./components/customer/EditCustomer.vue'),
      props: true,
    },
    {
      path: '/orders',
      name: 'home-orders',
      component: () => import('./components/order/OrderHome.vue'),
    },
    {
      path: '/orders/all',
      name: 'all-orders',
      component: () => import('./components/order/OrderList.vue'),
    },
    {
      path: '/orders/add',
      name: 'add-order',
      component: () => import('./components/order/AddOrder.vue'),
    },
    {
      path: '/orders/edit/:id',
      name: 'edit-order',
      component: () => import('./components/order/EditOrder.vue'),
      props: true,
    },
  ],
});
