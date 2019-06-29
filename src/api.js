import {map} from 'static';
import once from 'lodash/once';


export const Fill = async () => {
	let lib = await madLib();
	let fills = await getFills();
	let out = '';

	for( let i = 0; i < lib.value.length - 2; i++ ) {
		let these = await fills[ lib.blanks[i] ];
		out += lib.value[i] + these.shift();
	}
	return out;
};


const getFills = async () => {
	let data = await madLib();
	let fills = {};
	let counts = {};

	data.blanks.map( ( type ) => {
		counts[type] = counts[type] ? counts[type] + 1 : 1;
	} );

	Object.keys( counts ).map(  ( k ) => {
		if ( usable.hasOwnProperty( k ) ) {
			fills[k] = wordBot( { set: usable[k], count: counts[k] } );
		} else {
			fills[k] = map( k, counts[k] );
		}
	} );

	return fills;
};

const selectAbleNounSets = [
	'animals',
	'cats',
	'dinosaurs',
	'dogs',
	'fabrics',
	'flowers',
	'fruits',
	'gemstones',
	'horses',
	'objects',
	'sports',
	'vegetables',
	'wrestlers',
];

const usable = {
	'adjective': 'adjectives',
	'adverb': 'adverbs',
	'noun': 'nouns',
	'verb': 'verbs',
	'verb ending in \'ing\'': 'verbs',
	'plural noun': 'nouns',
};


export const madLib = once( async () => {
	return await Request( 'http://madlibz.herokuapp.com/api/random?minlength=5&maxlength=25', {} );

} );

export const wordBot = async ( params ) => {
	let r = await Request( 'https://api.noopschallenge.com/wordbot', params );
	return r.words;
};


const Request = async ( url, data ) => {
	console.info( data );
	return await $.ajax( {
		dataType: 'json',
		url: url,
		data: data,
	} );
};
