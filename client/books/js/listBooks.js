Template.listBooks.helpers({
	'books': function() {
		return Books.find();
	},
	'addingBook': function() {
		return Session.get('adding-book');
	}
});

Template.listBooks.events({
	'click #add-book-btn': function(e, tpl) {
		e.preventDefault();
		Session.set('adding-book', true);
	},
	'submit #add-book-form': function(e, tpl) {
		e.preventDefault();
		var title = e.target.title.value;
		var author = e.target.author.value;
		if (title.length) {
			Books.insert({'title':title, 'author':author});
			Session.set('adding-book', false);
		} else {
			console.log("Books insert: title can't be blank");
		}
	},
	'click #cancel-book-btn': function(e, tpl) {
		e.preventDefault();
		Session.set('adding-book', false);
	},
});
