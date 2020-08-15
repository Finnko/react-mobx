import {observable, computed, action} from 'mobx';
import productsStore from './products';

class Cart {
    @observable productsData = [];

    @computed get productsDetailed() {
        return this.productsData.map(product => {
            const productInfo = productsStore.findItem(product.id);
            return { ...productInfo, cnt: product.cnt };
        });
    }

    @computed get cartTotal() {
        return this.productsDetailed.reduce((acc, cur) => acc + cur.price * cur.cnt, 0);
    }

    @computed get productsCount() {
        return this.productsData.length;
    }

    @action addToCart = (id) => {
        const idx = this._findIndexById(id);

        if (idx !== -1) {
            if (this.productsData[idx].cnt === this.productsData[idx].rest) return;

            this.productsData[idx].cnt++;
        } else {
            const newProduct = productsStore.findItem(id);
            this.productsData.push(newProduct);
        }
    }

    @action removeFromCart = (id) => {
        const idx = this._findIndexById(id);

        if (idx !== -1) {
            if (this.productsData[idx].cnt === 0) return;

            this.productsData[idx].cnt--;
        }
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
