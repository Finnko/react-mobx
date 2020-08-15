import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Cart from '@/components/Cart';
import Order from '@/components/Order';
import Result from '@/components/Result';
import styles from './styles.module.css';

import getProducts from '@/util/productsData';
import userSettingContext from '@/contexts/userSettings';

export default class extends Component {
    state = {
        settings: {
            lang: 'ru',
            timezone: 'Europe/Moscow',
        },
        page: 'cart',
        products: getProducts(),
    }

    setSetting = (key, value) => this.setState({settings: {...this.state.settings, [key]: value}});

    setPage = (page) => this.setState({page});
    moveToCart = () => this.setPage('cart');
    moveToOrder = () => this.setPage('order');
    moveToResult = () => this.setPage('result');

    render() {
        let pageComponent;
        const {page, settings, products} = this.state;

        switch (page) {
            case 'cart':
                pageComponent = <Cart
                  products={products}
                  onChange={this.changeProductCnt}
                  onRemove={this.removeProduct}
                  onConfirm={this.moveToOrder}
                />
                break;
            case 'order':
                pageComponent = <Order
                  onCancel={this.moveToCart}
                  onConfirm={this.moveToResult}
                />
                break;
            case 'result':
                pageComponent = <Result
                  products={products}
                />
                break;
        }

        return <userSettingContext.Provider value={settings}>
            <main className={styles.main}>
                <Button
                  type="button"
                  variant="info"
                  onClick={() => this.setSetting('lang', 'ru')}
                >
                    ru
                </Button>
                {' '}
                <Button
                  type="button"
                  variant="info"
                  onClick={() => this.setSetting('lang', 'en')}
                >
                    en
                </Button>

                <hr/>
                    {pageComponent}
                <hr/>

                your lang: {settings.lang}
            </main>
        </userSettingContext.Provider>
    }
}
