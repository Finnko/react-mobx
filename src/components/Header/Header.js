import React, { useContext } from 'react';
import { MdShoppingCart } from "react-icons/md";
import styles from './styles.module.css';
import {Button, Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {routesMap} from '@/router';
import { observer } from 'mobx-react';
import storesContext from '@/contexts/stores';

const Header = ({ onSetSettings }) => {
    const { cartStore } = useContext(storesContext);
    const { cartTotal, productsCount} = cartStore;

    return (
      <header className={styles.header}>
          <Container>
              <Row>
                  <Col xs={2}>
                      <Button
                        type="button"
                        variant="info"
                        className="mr-3"
                        onClick={() => onSetSettings('lang', 'ru')}
                      >
                          ru
                      </Button>

                      <Button
                        type="button"
                        variant="info"
                        onClick={() => onSetSettings('lang', 'en')}
                      >
                          en
                      </Button>
                  </Col>
                  <Col xs={10} className="d-flex justify-content-end align-items-center">
                      <div>
                          <Link
                            to={routesMap.cart}
                            className={styles.cart}
                            data-value={productsCount}
                          >
                              <span className={styles.cartIcon}>
                                  <MdShoppingCart size="1.8em"/>
                              </span>
                              <span className={styles.cartText}>
                                  Cart
                              </span>
                          </Link>

                          <div>
                              <span className={styles.totalText}>
                                  Total
                              </span>
                              <span className={styles.totalValue}>
                                  {cartTotal}
                              </span>
                          </div>
                      </div>
                  </Col>
              </Row>

              <hr/>
          </Container>
      </header>
    );
};

export default observer(Header);
