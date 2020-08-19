import React from 'react';
import ReactDOM from 'react-dom';

import App from '@/components/App';
import Container from 'react-bootstrap/Container';
import storesContext from '@/contexts/stores';
import 'bootstrap/dist/css/bootstrap.min.css';

import store from '@/store';

store.cartStore.fetchCart();
store.productsStore.fetchProducts().then(() => {
	ReactDOM.render(
		<storesContext.Provider value={store}>
			<Container>
				<App/>
			</Container>
		</storesContext.Provider>,
		document.querySelector('#app')
	);
});

