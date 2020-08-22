import { observable, action, runInAction } from 'mobx';
import { AppMessages, NotificationTypes } from '../const';

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
            }).catch(() => {
                this.rootStore.notificationsStore.addNotify(
                  AppMessages.ERROR_FETCH_DATA,
                  NotificationTypes.ERROR,
                )
            });
    }
}

export default Products;
