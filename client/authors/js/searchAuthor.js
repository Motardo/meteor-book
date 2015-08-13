Template.searchAuthor.helpers({
	'author': function() {
		return Session.get('author');
	}
});

Template.searchAuthor.events({
	'submit #author-search-form': function(e, tpl) {
		e.preventDefault();
		var name = titleize(e.target.name.value);
		var key = keyify(e.target.name.value);
		console.log('Author search: ' + name);
		var author = Authors.findOne({'key': key});
		if (author) {
			console.log('Found author: ' + author.name);
			Session.set('author', author);
			Router.go('authorBooks', {id: author._id});
		} else {
			console.log('Not found: ' + name);
			Meteor.call('searchLOCByAuthor', name, function(err, res) {
				if (err) {
					console.log('searchLoc Error: ' + err);
				} else {
					Session.set('author', res);
					Router.go('authorBooks', {id: res});
				}
			});
		}
	}
});

