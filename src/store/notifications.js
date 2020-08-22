import {observable, computed, action} from 'mobx';

class Notifications {
    @observable notifications = {};
    _ai = 0;

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @computed get notifiesList() {
        return Object.values(this.notifications);
    }

    @action addNotify(message, type, timeToDestroy = 5000) {
        this.notifications[++this._ai] = {
            id: this._ai,
            message,
            type,
        };

        if (timeToDestroy) {
            const current = this._ai;

            setTimeout(() => {
                this.removeNotify(current);
            }, timeToDestroy);
        }
    }

    @action removeNotify = (id) => {
        if (id in this.notifications) {
            delete this.notifications[id];
        }
    }
}

export default Notifications;
