import React, {useContext} from 'react';
import Table from 'react-bootstrap/Table';
import CartItem from '@/components/CartItem';
import storesContext from '@/contexts/stores';
import { observer } from 'mobx-react';

const Cart = ({ onConfirm }) => {
	const { cartStore } = useContext(storesContext);
	const {
		productsData,
		productsCount,
		cartTotal,
		changeProductCnt,
		removeProduct,
	} = cartStore;

	const productsItems = productsData.map((product) => {
		return <CartItem key={product.id}
			{...product}
			onChange={changeProductCnt}
			onRemove={removeProduct}
		/>
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
			<div><strong>InCart: { productsCount }</strong></div>
			<div><strong>Total: { cartTotal }</strong></div>
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

