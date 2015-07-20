Meteor.methods({
	'removeBook': function(bibId) {
		check(bibId, String);
		Books.remove(bibId);
	}
});

