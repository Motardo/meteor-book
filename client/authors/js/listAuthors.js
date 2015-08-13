Template.listAuthors.helpers({
    'authors': function() {
        return Authors.find();
    }
});

Router.route('/author/:id/books', {
	name: 'authorBooks',
	template: 'authorBooks',
	data: function() {
		var id = this.params.id;
		return Authors.findOne({_id: id});
	}
});
