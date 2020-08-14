import React from 'react';
import Table from 'react-bootstrap/Table';
import CartItem from '../CartItem';

export default function({ products, onChange, onRemove, onConfirm }){
	const cartCnt = products.length;
	const cartTotal = products.reduce((acc, cur) => acc + cur.price * cur.cnt, 0);

	const productsItems = products.map((product) => {
		return <CartItem key={product.id}
			{...product}
			onChange={onChange}
			onRemove={onRemove}
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
			<div><strong>InCart: { cartCnt }</strong></div>
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
