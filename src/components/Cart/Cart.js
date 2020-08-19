import React, {useContext} from 'react';
import storesContext from '@/contexts/stores';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { routesMap } from '@/router';
import { Table, Button } from 'react-bootstrap';
import CartItem from '@/components/CartItem';

const Cart = ({ onConfirm }) => {
	const { cartStore } = useContext(storesContext);
	const {
		productsDetailed: productsData,
		productsCount,
		cartTotal,
		changeProductCnt,
		removeFromCart,
		cleanCart,
	} = cartStore;

	const productsItems = productsData.map((product) => {
		const inProcess = cartStore.inProcess(product.id);

		return (
			<CartItem
				key={product.id}
				{...product}
				inProcess={inProcess}
				changeProductCnt={changeProductCnt}
				removeFromCart={removeFromCart}
			/>
		);
	});

	return (
		<div>
			<Table
				striped
				bordered
				hover
				responsive
				size="sm"
			>
				<tbody>
					<tr>
						<td>Title</td>
						<td>Price</td>
						<td>Count</td>
						<td>Total</td>
						<td>Actions</td>
					</tr>
					{ productsItems }
				</tbody>
			</Table>
			<Button
				variant="secondary"
				onClick={cleanCart}
			>
				Clean cart
			</Button>

			<hr/>

			<div className="mb-2"><strong>InCart: { productsCount }</strong></div>
			<div className="mb-2"><strong>Total: { cartTotal }</strong></div>
			<div>
				<button
					className="btn btn-success"
					type="button"
					onClick={ onConfirm }
				>
					Send
				</button>
			</div>
		</div>
	);
}

export default observer(Cart);

