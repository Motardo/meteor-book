Template.search.helpers({
	'author': function() {
		return Session.get('author');
	}
});

Template.search.events({
	'submit #author-search-form': function(e, tpl) {
		e.preventDefault();
		console.log('Author search: ' + e.target.name.value);
		var name = e.target.name.value;
		//TODO titleize
		var author = Authors.findOne({'name': name});
		if (author) {
			console.log('Found author: ' + author.name);
			Session.set('author', author);
		} else {
			console.log('Not found: ' + name);
			Meteor.call('searchLOC', name, function(err, res) {
				if (err) {
					console.log('searchLoc Error: ' + err);
				} else {
					Session.set('author', res);
				}
			});
		}
	}
});

