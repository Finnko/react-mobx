import React, { useContext } from 'react';
import userSettingContext from '@/contexts/userSettings';
import { observer } from 'mobx-react';
import storesContext from '@/contexts/stores';

const Result = () => {
	const { lang } = useContext(userSettingContext);
	const { orderStore, cartStore } = useContext(storesContext);

	const { cartTotal, productsCount} = cartStore;
	const { getValue } = orderStore;

	return (
		<div>
			<h1>Result</h1>
			<div>
				<div>
					<strong>
						{ lang === 'ru' ? 'Привет' : 'Hello' }, { getValue('name') }
					</strong>
				</div>

				<div>
					<strong>InCart: { productsCount }</strong>
				</div>
				<div>
					<strong>Total: { cartTotal }</strong>
				</div>
			</div>
		</div>
	);
}

export default observer(Result);
