import ProductsList from '@/components/Products';
import Cart from '@/components/Cart';
import Order from '@/components/Order';
import Result from '@/components/Result';
import Page404 from '@/components/Page404';

const routes = [
    {
        name: 'products',
        path: '/',
        component: ProductsList,
    },
    /* {
        name: 'products/:id',
        path: '/',
        component: ProductsItem
    }, */
    {
        name: 'cart',
        path: '/cart',
        component: Cart,
    },
    {
        name: 'order',
        path: '/order',
        component: Order,
    },
    {
        name: 'result',
        path: '/result',
        component: Result,
        exact: false,
    },
    {
        path: '**',
        component: Page404,
    }
]

const routesMap = {};

routes.forEach(route => {
    if (route.hasOwnProperty('name')){
        routesMap[route.name] = route.path;
    }
});

export { routes, routesMap };
