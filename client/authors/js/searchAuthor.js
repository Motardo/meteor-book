Template.searchAuthor.helpers({
	'author': function() {
		return Session.get('author');
	}
});

Template.searchAuthor.events({
	'submit #author-search-form': function(e, tpl) {
		e.preventDefault();
		var name = titleize(e.target.name.value);
		searchAuthor(name);
	}
});

