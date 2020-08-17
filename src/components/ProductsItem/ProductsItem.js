import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';
import { useParams, Redirect } from 'react-router-dom';
import { observer } from 'mobx-react';
import storesContext from '@/contexts/stores';
import {routesMap} from '@/router';
import styles from './styles.module.css';

const ProductsItem = () => {
    const { productsStore } = useContext(storesContext);
    const { findItem } = productsStore;
    const { id } = useParams();
    const product = findItem(parseInt(id, 10));

    if (!product) {
        return <Redirect to={routesMap.products}/>
    }

    return (
      <Card className={styles.card}>
          <div className={styles.cardImgWrap}>
              <Card.Img
                className={styles.cardImg}
                variant="top"
                src="https://source.unsplash.com/random/200x200"
              />
          </div>
          <Card.Body>
              <Card.Title>
                  {product.title}
              </Card.Title>
              <Card.Text>
                  {product.price}
              </Card.Text>
              <Card.Text>
                  <span>Остаток на складе&nbsp;</span>
                  {product.rest}
              </Card.Text>
          </Card.Body>
      </Card>
    );
};

export default observer(ProductsItem);
