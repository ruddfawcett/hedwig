module.exports = function(code) {
	var response;

	switch (code) {
		case 500:
			response = {error: 'An error occurred pushing the notification.'};
			break;

		default:
			response = {error: 'The requested path was not found.'};
			break;
	}

	return response;
}