import {wordBot} from './api';

const foreignCountry = [
	'China', 'Canada', 'Russia', 'Germany', 'Australia', 'India', 'United Kingdom', 'Japan', 'France', 'Singapore', 'Israel', 'North Korea', 'United States of America', 'New Zealand'];

const places = ['Upstairs', 'Gym', 'Mcdonalds', 'Park', 'Church', 'Schools', 'Police Station', 'Fire Station', 'Yogi Bear', 'The Bar'];

const liquids = ['Water', 'Beer', 'Wine', 'Piss', 'Soda', 'Acid', 'Milk', 'Blood', 'Gasoline', 'Honey', 'Coffee'];

const bodyParts = ['legs', 'arms', 'penis', 'toes', 'fingers', 'eyes', 'mouth', 'ears', 'bunghole', 'neck'];

export const selectAbleNounSets = [
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

export const usable = {
	'adjective': 'adjectives',
	'adverb': 'adverbs',
	'noun': 'nouns',
	'verb': 'verbs',
	'verb ending in \'ing\'': 'verbs',
	'plural noun': 'nouns',
};


export const map = async ( $type, $count ) => {
	switch ( $type ) {
		case  'part of the body':
			return getRandom( bodyParts, $count );
		case 'type of liquid':
			return getRandom( liquids, $count );
		case 'foreign country':
			return getRandom( foreignCountry, $count );
		case 'a place':
			return getRandom( places, $count );
	}
	//Fallback to any old word
	return wordBot( { count: $count } );
};

const getRandom = ( arr, n ) => {
	let result = new Array( n ),
		len = arr.length,
		taken = new Array( len );
	if ( n > len )
		throw new RangeError( 'getRandom: more elements taken than available' );
	while ( n-- ) {
		let x = Math.floor( Math.random() * len );
		result[n] = arr[x in taken ? taken[x] : x];
		taken[x] = --len in taken ? taken[len] : len;
	}
	return result;
};
