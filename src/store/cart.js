import {observable, computed, action, runInAction} from 'mobx';

class Cart {
    constructor(rootStore){
        this.rootStore = rootStore;
        this.api = rootStore.api.cart;
        this.storage = rootStore.storage;
    }

    @observable productsData = [];
    @observable processId = [];
    token = null;

    @computed get productsDetailed() {
        return this.productsData.map(product => {
            const productInfo = this.rootStore.productsStore.findItem(product.id);
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
        this.token = this.storage.getItem('CART_TOKEN');

        this.api.load(this.token).then(({ cart, token, needUpdate }) => {
            runInAction(() => {
                if (needUpdate) {
                    this.storage.setItem('CART_TOKEN', token);
                    this.token = token;
                } else {
                    this.productsData = cart;
                }
            });
        });

    }

    @action addToCart = (id) => {
        if (!this.inCart(id) && !this.inProcess(id)) {
            this._startProcess(id);

            this.api.add(this.token, id).then(response => {
                runInAction(() => {
                    if (response) {
                        this.productsData.push({ id, cnt: 1 });
                    }

                    this._stopProcess(id);
                });
            });
        }
    }

    @action removeFromCart = (id) => {
        if (this.inCart(id) && !this.inProcess(id)) {
            this._startProcess(id);

            this.api.remove(this.token, id).then(response => {
                runInAction(() => {
                    if (response) {
                        const idx = this._findIndexById(id);
                        this.productsData.splice(idx, 1 );
                    }

                    this._stopProcess(id);
                });
            });
        }
    }

    @action cleanCart = () => {
        this.api.clean(this.token).then(response => {
            runInAction(() => {
                if (response) {
                    this.productsData = [];
                }
            });
        });
    }

    @action changeProductCnt = (id, cnt) => {
        if (this.inCart(id) && !this.inProcess(id)) {
            this._startProcess(id);
            const idx = this._findIndexById(id);

            this.api.change(this.token, id, cnt).then(response => {
                runInAction(() => {
                    if (response) {
                        this.productsData[idx].cnt = cnt;
                    }

                    this._stopProcess(id);
                });
            });
        }
    }

    inProcess = (id) => {
        return this._findProcessIndex(id) !== -1;
    }

    _findIndexById = (id) => {
        return this.productsData.findIndex(item => item.id === id);
    }

    inCart = (id) => {
        return this._findIndexById(id) !== -1;
    }

    _findProcessIndex = (id) => {
        return this.processId.indexOf(id);
    }

    _startProcess = (id) => {
        this.processId.push(id);
    }

    _stopProcess = (id) => {
        let idx = this._findProcessIndex(id);

        if(idx !== -1){
            this.processId.splice(idx, 1);
        }
    }
}

export default Cart;
