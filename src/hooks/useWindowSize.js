import { useState, useEffect } from 'react';

function getSize(){
	return {
		width: window.innerWidth,
		height: window.innerHeight
	}
}

export default function(){
	let [ size, setSize ] = useState(getSize());

	useEffect(() => {
		window.addEventListener('resize', function(){
			setSize(getSize());
		});
	}, []);

	return size;
}