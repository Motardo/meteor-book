Template.shortBook.helpers({
})

Template.shortBook.events({
	'click .author-link': function (evt, tpl) {
		evt.preventDefault();
		console.log(this);
		searchAuthor(this.author);
	},
	'click #delete-book-btn': function(e, tpl) {
		e.preventDefault();
		var bibId = this._id;
		console.log('delete clicked ' + bibId);
		Meteor.call('removeBook', bibId);
	}
});

