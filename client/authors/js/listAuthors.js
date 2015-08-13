Template.listAuthors.helpers({
    'authors': function() {
        return Authors.find();
    }
});

Router.route('/author/:key/books', {
	name: 'authorBooks',
	template: 'authorBooks',
	data: function() {
		var key = this.params.key;
		return Authors.findOne({'key': key});
	}
});
