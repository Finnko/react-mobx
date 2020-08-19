import React, { memo } from 'react';
import CounterReal from '@/components/Counters/minmax';
import Button from 'react-bootstrap/Button';
import styles from './styles.module.css';

const CartItem = ({
	id,
	title,
	price,
	rest,
	cnt,
	inProcess,
	changeProductCnt,
	removeFromCart,
}) => {
	const handleInputChange = (current) => changeProductCnt(id, current);
	const handleButtonRemove = () => removeFromCart(id);

	return (
		<tr>
			<td className={styles.cell}>{ title }</td>
			<td className={styles.cell}>{ price }</td>
			<td className={styles.cell}>
				<CounterReal
					max={rest}
					current={cnt}
					inProcess={inProcess}
					onChange={handleInputChange}
				/>
			</td>
			<td className={styles.cell}>{ price * cnt }</td>
			<td className={styles.cell}>
				<Button
					type="button"
					variant="danger"
					disabled={inProcess}
					onClick={handleButtonRemove}
				>
					Remove
				</Button>
			</td>
		</tr>
	);
}

export default memo(CartItem);
