import {map, usable} from 'static';
import once from 'lodash/once';
import Pluralize from 'pluralize';
import {getPastTense} from './past-tense';


const isVowel = ( x ) => {
	x = x.toUpperCase();
	return x === 'A' || x === 'E' || x === 'I' || x === 'O' || x === 'U';
};

export const Fill = async () => {
	let lib = await madLib();
	let fills = await getFills();
	let out = '';

	for ( let i = 0; i < lib.value.length - 2; i++ ) {
		let these = await fills[lib.blanks[i]];
		if ( 'verb ending in \'ing\'' === lib.blanks[i] ) {
			these[0] = these[0] + 'ing';
		}
		if ( 'plural noun' === lib.blanks[i] ) {
			these[0] = Pluralize( these[0] );
		}
		if ( 'past tense verb' === lib.blanks[i] ) {
			these[0] = getPastTense( these[0] );
		}

		if ( isVowel( these[0].substr( 0, 1 ) ) ) {
			lib.value[i] = lib.value[i].replace( 'a/an', 'an' );
		} else {
			lib.value[i] = lib.value[i].replace( 'a/an', 'a' );
		}
		out += lib.value[i] + these.shift();
	}
	return { title: lib.title, content: out };
};


const getFills = async () => {
	let data = await madLib();
	let fills = {};
	let counts = {};

	data.blanks.map( ( type ) => {
		counts[type] = counts[type] ? counts[type] + 1 : 1;
	} );

	Object.keys( counts ).map( ( k ) => {
		if ( usable.hasOwnProperty( k ) ) {
			fills[k] = wordBot( { set: usable[k], count: counts[k] } );
		} else {
			fills[k] = map( k, counts[k] );
		}
	} );

	return fills;
};

export const madLib = once( async () => {
	return await Request( 'https://madlibz.herokuapp.com/api/random?minlength=5&maxlength=50', {} );

} );

export const wordBot = async ( params ) => {
	let r = await Request( 'https://api.noopschallenge.com/wordbot', params );
	return r.words;
};


const Request = async ( url, data ) => {
	return await $.ajax( {
		dataType: 'json',
		url: url,
		data: data,
	} );
};
