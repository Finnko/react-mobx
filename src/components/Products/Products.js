import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import storesContext from '@/contexts/stores';
import { observer } from 'mobx-react';
import { Card, Row, Col } from 'react-bootstrap';

const Products = () => {
    const { productsStore } = useContext(storesContext);
    const { items } = productsStore;

    const productsCards = items.map((item) => {
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

                      <Link to={'/product/' + item.id}>
                          Get more...
                      </Link>
                      <hr/>
                      hw btn
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
