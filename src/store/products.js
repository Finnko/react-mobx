import { observable, action } from 'mobx';
import * as productsApi from '@/api/products';

class Products {
    @observable items = [];

    findItem = (id) => {
        return this.items.find(item => id === item.id);
    }

    @action fetchProducts(){
        return productsApi.fetchProducts().then(products => {
            this.items = products;
        });
    }
}

export default new Products();
