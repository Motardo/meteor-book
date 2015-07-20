Template.shortBook.events({
	'click #delete-book-btn': function(e, tpl) {
		e.preventDefault();
		var bibId = this._id;
		console.log('delete clicked ' + bibId);
		Meteor.call('removeBook', bibId);
	}
});

