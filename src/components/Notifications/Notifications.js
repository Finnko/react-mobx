import React, {useContext} from 'react';
import { observer } from 'mobx-react';
import storesContext from '@/contexts/stores';
import {NotificationTypes} from '../../const';
import styles from './styles.module.css';

const Notifications = () => {
    const { notificationsStore } = useContext(storesContext);
    const { notifiesList, removeNotify } = notificationsStore;

    const notifies = notifiesList.map(notify => {
        const modifier = notify.type === NotificationTypes.SUCCESS ? styles['notify--success'] : styles['notify--error'];
        return (
          <div
            key={notify.id}
            className={`${styles.notify} ${modifier}`}
            onClick={() => removeNotify(notify.id)}
          >
              {notify.message}
          </div>
        );
    })

    return (
      <div className={styles.notifies}>
          {notifies}
      </div>
    );
};

export default observer(Notifications);
