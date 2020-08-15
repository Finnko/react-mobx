import React, {useContext} from 'react';
import storesContext from '@/contexts/stores';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { routesMap } from '@/router';
import Table from 'react-bootstrap/Table';
import CartItem from '@/components/CartItem';

const Cart = ({ onConfirm }) => {
	const { cartStore } = useContext(storesContext);
	const {
		productsDetailed: productsData,
		productsCount,
		cartTotal,
		changeProductCnt,
		removeProduct,
	} = cartStore;

	const productsItems = productsData.map((product) => {
		return (
			<CartItem
				key={product.id}
				{...product}
				onChange={changeProductCnt}
				onRemove={removeProduct}
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

