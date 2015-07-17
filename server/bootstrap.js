//run this when server is started
Meteor.startup(function() {
	if (Books.find().count() === 0) {
		var sampleBooks = [
			{title: 'A Book', author: 'E.B. Wee', published: '2010'},
			{title: 'Foosbooms', author: 'E.B. Wee', published: '2013'},
			{title: 'Book Two', author: 'Ray Jay', published: '2010'},
		];
		_.each(sampleBooks, function(book) {
			Books.insert(book);
		});
	}
});

