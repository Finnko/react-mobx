import { configure } from 'mobx';

import CartStore from './cart';
import OrderStore from './order';
import ProductsStore from './products';
import NotificationsStore from './notifications';

import * as cartApi from '@/api/cart';
import * as productsApi from '@/api/products';

configure({ enforceActions: "observed" });

class RootStore {
    constructor() {
        this.api = {
            cart: cartApi,
            products: productsApi,
        }

        this.storage = localStorage;

        this.cartStore = new CartStore(this);
        this.orderStore = new OrderStore(this);
        this.productsStore = new ProductsStore(this);
        this.notificationsStore = new NotificationsStore(this);
    }
}

export default new RootStore();
