import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import storesContext from '@/contexts/stores';
import { observer } from 'mobx-react';
import {Card, Row, Col, Button} from 'react-bootstrap';
import styles from './styles.module.css';

const Products = () => {
    const { productsStore, cartStore } = useContext(storesContext);
    const { items } = productsStore;
    const { addToCart, removeFromCart} = cartStore;

    const productsCards = items.map((item) => {
        const inCart = cartStore.inCart(item.id);
        const inProcess = cartStore.inProcess(item.id);

        return (
          <Col
            xs={4}
            key={item.id}
            className="mt-3 mb-3"
          >
              <Card>
                  <Card.Body>
                      <Card.Title>{item.title}</Card.Title>
                      <Card.Text>
                          <strong>Price: {item.price}</strong>
                      </Card.Text>

                      <Link
                        to={'/products/' + item.id}
                        className={styles.details}
                      >
                          Details
                      </Link>
                      <hr/>
                      <div>
                          {inCart &&
                              <Button
                                type="button"
                                variant="warning"
                                className="mr-3"
                                disabled={inProcess}
                                onClick={() => removeFromCart(item.id)}
                              >
                                  Remove
                              </Button>
                          }

                          {!inCart &&
                              <Button
                                type="button"
                                variant="success"
                                disabled={inProcess}
                                onClick={() => addToCart(item.id)}
                              >
                                  Add
                              </Button>
                          }
                      </div>
                  </Card.Body>
              </Card>
          </Col>
        );
    });

    return <div>
        <h1>Products List</h1>
        <hr/>
        <Row>{productsCards}</Row>
    </div>
};

export default observer(Products);
