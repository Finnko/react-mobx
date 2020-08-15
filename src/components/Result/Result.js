import React, { useContext } from 'react';
import userSettingContext from '@/contexts/userSettings';
import { observer } from 'mobx-react';
import storesContext from '@/contexts/stores';

const Result = ({ products }) => {
	const { lang } = useContext(userSettingContext);
	const { order: orderStore } = useContext(storesContext);

	const cartCnt = products.length;
	const cartTotal = products.reduce((acc, cur) => acc + cur.price * cur.cnt, 0);

	return (
		<div>
			<h1>Result</h1>
			<div>
				<div>
					<strong>{ lang === 'ru' ? 'Привет' : 'Hello' }, { orderStore.getValue('name') }</strong>
				</div>

				<div><strong>InCart: { cartCnt }</strong></div>
				<div><strong>Total: { cartTotal }</strong></div>
			</div>
		</div>
	);
}

export default observer(Result);
