import { observable, action, runInAction } from 'mobx';

class Products {
    constructor(rootStore){
        this.rootStore = rootStore;
        this.api = rootStore.api.products;
    }

    @observable items = [];

    findItem = (id) => {
        return this.items.find(item => id === item.id);
    }

    @action fetchProducts() {
            return this.api.fetchProducts().then(products => {
                runInAction(() => {
                    this.items = products;
                })
            });
    }
}

export default Products;
