Template.shortBook.events({
	'click #delete-book-btn': function(e, tpl) {
		e.preventDefault();
		console.log('delete clicked ' + this);
		Books.remove(this._id);
	}
});

