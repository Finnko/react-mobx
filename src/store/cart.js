import {observable, computed, action} from 'mobx';
import productsStore from './products';

class Cart {
    @observable productsData = [
      {id: 1, cnt: 2},
      ];

    @computed get productsDetailed(){
        return this.productsData.map(product => {
            let productInfo = productsStore.findItem(product.id);
            return { ...productInfo, cnt: product.cnt };
        });
    }

    @computed get cartTotal() {
        return this.productsDetailed.reduce((acc, cur) => acc + cur.price * cur.cnt, 0);
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
