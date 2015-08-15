/**
 * Convert string to Title case
 */
titleize = function(str) {
	return str.replace(/\w+/g, function(txt){
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
};

// Remove punctuation, numbers, spaces, and alphabetize words
keyify = function (str) {
	return str.replace(/,/g, ' ')
		.replace(/[^a-zA-Z ]/g, '').
		toLowerCase().split(" ").sort().join('');
};
