Meteor.startup(function () {
	Meteor.methods({
		'searchLOCByBibId': searchLOCByBibId, 
		'searchLOCByAuthor': searchLOCByAuthor,
		'removeBook': function(bibId) {
			check(bibId, String);
			Books.remove(bibId);
		}
	});
});
