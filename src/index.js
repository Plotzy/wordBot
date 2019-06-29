import React from 'react';
import ReactDOM from 'react-dom';
import {Fill} from './api';
import {useAsync} from 'react-async';


const UI = () => {
	const { data, error, isLoading } = useAsync( Fill );
	return (
		<div>
			<h1>{!isLoading && data.title}</h1>
			{isLoading &&
			<img alt="I suck" src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/0.16.1/images/loader-large.gif"/>}

			<pre>{!isLoading && data.content}</pre>
		</div>
	);
};

ReactDOM.render( <UI/>, document.getElementById( 'main' ) );
