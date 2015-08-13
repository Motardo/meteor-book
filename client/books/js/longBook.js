Template.longBook.events({
	'click .author-link': function (evt, tpl) {
		evt.preventDefault();
		console.log(this);
		searchAuthor(this.author);
	}
});

