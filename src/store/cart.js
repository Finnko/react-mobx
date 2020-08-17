import {observable, computed, action} from 'mobx';
import * as cartApi from '@/api/cart';
import productsStore from './products';

class Cart {
    @observable productsData = [];
    token = null;

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

    @action fetchCart(){
        this.token = localStorage.getItem('CART_TOKEN');

        cartApi.load(this.token).then(({ cart, token, needUpdate }) => {
            if (needUpdate) {
                localStorage.setItem('CART_TOKEN', token);
                this.token = token;
            } else {
                this.productsData = cart;
            }
        });
    }

    @action addToCart = (id) => {
        if (!this._inCart(id)) {
            cartApi.add(this.token, id).then(response => {
                if (response) {
                    this.productsData.push({ id, cnt: 1 });
                }
            });
        }
    }

    @action removeFromCart = (id) => {
        if (this._inCart(id)) {
            cartApi.remove(this.token, id).then(response => {
                if (response) {
                    const idx = this._findIndexById(id);
                    this.productsData.splice(idx, 1 );
                }
            });
        }
    }

    @action cleanCart = () => {
        cartApi.clean(this.token).then(response => {
            if (response) {
                this.productsData = [];
            }
        })
    }

    @action changeProductCnt = (id, cnt) => {
        const idx = this._findIndexById(id);

        cartApi.change(this.token, id, cnt).then(response => {
            if (response) {
                this.productsData[idx].cnt = cnt;
            }
        })
    }

    _findIndexById(id) {
        return this.productsData.findIndex(item => item.id === id);
    }

    _inCart(id) {
        return this._findIndexById(id) !== -1;
    }
}

export default new Cart();
