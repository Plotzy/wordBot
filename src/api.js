


export default Request = ( data, cb ) => {
	$.ajax({
		dataType: "json",
		url: 'https://api.noopschallenge.com/wordbot',
		data: data,
		success: cb
	});
};
