import {observable, computed, action} from 'mobx';
import getProducts from '@/util/productsData';

class Cart {
    @observable productsData = getProducts();

    @computed get cartTotal() {
        return this.productsData.reduce((acc, cur) => acc + cur.price * cur.cnt, 0);
    }

    @computed get productsCount() {
        return this.productsData.length;
    }

    @action changeProductCnt = (id, cnt) => {
        const idx = this._findIndexById(id);

        if (idx !== -1) {
            this.productsData[idx].cnt = cnt;
        }
    }

    @action removeProduct = (id) => {
        const idx = this._findIndexById(id);

        if (idx !== -1) {
            this.productsData.splice(idx, 1);
        }
    }

    _findIndexById(id) {
        return this.productsData.findIndex(item => item.id === id);
    }
}

export default new Cart();
