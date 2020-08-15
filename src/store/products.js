import { observable, computed, action } from 'mobx';
import getProducts from '@/util/productsData';

class Products{
    @observable items = getProducts();

    findItem(id) {
        return this.items.find(item => id === item.id);
    }
}

export default new Products();
