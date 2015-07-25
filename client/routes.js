Router.route('/', {
	template: 'main'
});

Router.route('/books/:bibId', {
	template: 'longBook',
//	waitOn: function() {
//		return [Meteor.subscribe('books')];
//	},
	data: function() {
		var bibId = this.params.bibId;
		var book = Books.findOne({'bibId': bibId});
		if (book) {
			console.log('Book found: ' + bibId);
			return book;
		} else if (this.ready()) {
			console.log('Book not found: ' + bibId);
			Meteor.call('searchLOCbibId', bibId, function(err, res) {
				if (err) {
					console.log('searchLOCbibId Error: ' + err);
				} else {
					console.log('searchLOCbibId success: ' + res);
				}
			});
		}
	}
});

