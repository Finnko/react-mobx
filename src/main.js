import React from 'react';
import ReactDOM from 'react-dom';

import App from '@/components/App';
import Container from 'react-bootstrap/Container';
import storesContext from '@/contexts/stores';
import 'bootstrap/dist/css/bootstrap.min.css';

import orderStore from '@/store/order';
import cartStore from '@/store/cart';
import productsStore from '@/store/products';

const stores = {
	orderStore,
	cartStore,
	productsStore,
}

ReactDOM.render(
	<storesContext.Provider value={stores}>
		<Container>
			<App/>
		</Container>
	</storesContext.Provider>,
	document.querySelector('#app')
);
