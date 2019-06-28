import Request from 'api';
import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';


const UI = () => {
	const [data, setData] = useState( {} );
	useEffect( () => Request( {}, ( r ) => {
		setData( r );
	} ) );

	return (
		<div>
			<h1> Yes I am kidding you!</h1>
			{JSON.stringify( data )}
		</div>
	);
};

ReactDOM.render( <UI/>, document.getElementById( 'main' ) );
