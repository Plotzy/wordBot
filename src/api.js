import {map} from 'static';
import once from 'lodash/once';
import Pluralize from 'pluralize';
import {getPastTense} from './past-tense';

export const Fill = async () => {
	let lib = await madLib();
	let fills = await getFills();
	let out = '';

	for( let i = 0; i < lib.value.length - 2; i++ ) {
		let these = await fills[ lib.blanks[i] ];
		if ( "verb ending in 'ing'" === lib.blanks[i] ) {
			these[0] = these[0] + 'ing';
		}
		if ( "plural noun" === lib.blanks[i] ) {
			these[0] = Pluralize( these[0] );
		}
		if ( "past tense verb" === lib.blanks[i] ) {
			these[0] = getPastTense( these[0] );
		}
		out += lib.value[i] + these.shift();
	}
	return {title : lib.title, content : out};
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
	return await $.ajax( {
		dataType: 'json',
		url: url,
		data: data,
	} );
};
