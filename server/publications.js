Meteor.publish('books', function() {
	return Books.find();
});

Meteor.publish('authors', function() {
	return Authors.find();
});

