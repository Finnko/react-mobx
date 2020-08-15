import React, { useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react';
import storesContext from '@/contexts/stores';

const ProductsItem = () => {
    const { productsStore } = useContext(storesContext);
    const { findItem } = productsStore;
    const { id } = useParams();
    const product = findItem(id);

    return (
      <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="https://source.unsplash.com/random/100x180" />
          <Card.Body>
              <Card.Title>
                  {product.title}
              </Card.Title>
              <Card.Text>
                  {product.price}
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
          </Card.Body>
      </Card>
    );
};

export default observer(ProductsItem);
