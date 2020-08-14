import React, { memo } from 'react';
import CounterReal from '../Counters/minmax';
import Button from 'react-bootstrap/Button';
import styles from './styles.module.css';

const CartItem = ({
	id,
	title,
	price,
	rest,
	cnt,
	onChange,
	onRemove,
}) => {
	const handleInputChange = (current) => onChange(id, current);
	const handleButtonRemove = () => onRemove(id);

	return (
		<tr>
			<td className={styles.cell}>{ title }</td>
			<td className={styles.cell}>{ price }</td>
			<td className={styles.cell}>
				<CounterReal
				max={rest}
				current={cnt}
				onChange={handleInputChange}
				/>
			</td>
			<td className={styles.cell}>{ price * cnt }</td>
			<td className={styles.cell}>
				<Button
				type="button"
				variant="danger"
				onClick={handleButtonRemove}
				>
					Remove
				</Button>
			</td>
		</tr>
	);
}

export default memo(CartItem);
