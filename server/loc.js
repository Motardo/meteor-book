Meteor.startup(function() {
	Meteor.methods({
		'searchLOC': function(name) {
			var author = Authors.findOne({'name': name});
			if (author) {
				return author;
			} else {
				console.log('Search LOC for: ' + name);
				var url = 'http://catalog.loc.gov/vwebv/search?searchArg=' +
							name.replace(/ /gm, '+') +
							'&searchCode=GKEY^*&searchType=0&recCount=50';
				var html = Meteor.http.get(url).content;
				author = {'name': 'loading'};
				
				if (html) {
					var books = [];
					var $ = cheerio.load(html);

					$('.resultListCellBlock').each(function (i, el) {
						var author = $(el).find('div').eq(1).text();
						var year;
					//	if (author[0] === '\n') {
					//		author = '';
					//		year = $(el).find('div').eq(1).text().replace(/[^0-9]/gm, '');
					//	} else {
							year = $(el).find('div').eq(3).text().replace(/[^0-9]/gm, '');
					//	}
						var titleLink = $(el).find('a').first();
						var title = titleLink.text().match(/[^\/]+/)[0].trim();
						var href = titleLink.attr('href');
						var bibId = href.match(/bibId=[0-9]+/)[0].substring(6);
						books.push({ 'author': author, 'title': title, 'year': year, 'bibId': bibId });
					});
					author.name = name;
					author.books = books;
					Authors.insert(author, function(err, res) {
						if (err) {
							console.log('Author insert error: ' + err);
						} else {
							console.log('Author insert success: ' + res);
						}
					});
					return author;
				}
			}
		}
	});
});
