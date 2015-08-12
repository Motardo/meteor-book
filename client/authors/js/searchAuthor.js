Template.searchAuthor.helpers({
	'author': function() {
		return Session.get('author');
	}
});

Template.searchAuthor.events({
	'submit #author-search-form': function(e, tpl) {
		e.preventDefault();
		var name = titleize(e.target.name.value);
		console.log('Author search: ' + name);
		var author = Authors.findOne({'name': name});
		if (author) {
			console.log('Found author: ' + author.name);
			Session.set('author', author);
		} else {
			console.log('Not found: ' + name);
			Meteor.call('searchLOCByAuthor', name, function(err, res) {
				if (err) {
					console.log('searchLoc Error: ' + err);
				} else {
					Session.set('author', res);
				}
			});
		}
	}
});

