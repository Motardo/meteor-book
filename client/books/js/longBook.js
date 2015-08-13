Template.longBook.events({
	'click .author-link': function (evt, tpl) {
		evt.preventDefault();
		console.log(this);
		searchAuthor(this.author);
	}
});

function searchAuthor (name) {
	var key = keyify(name);
	console.log('Author search: ' + name);
	var author = Authors.findOne({'key': key});
	if (author) {
		console.log('Found author: ' + author.name);
		Session.set('author', author);
		Router.go('authorBooks', {'key': author.key});
	} else {
		console.log('Not found: ' + name);
		Meteor.call('searchLOCByAuthor', name, function(err, res) {
			if (err) {
				console.log('searchLoc Error: ' + err);
			} else {
				Session.set('author', res);
				Router.go('authorBooks', {'key': key});
			}
		});
	}
}


