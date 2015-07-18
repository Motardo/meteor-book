Meteor.startup(function() {
	Meteor.methods({
		'searchLOCbibId': searchLOCbibId, 
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

var searchLOCbibId =  function(bibId) {
	console.log('Search LOC for: ' + bibId);
	var book = {'bibId': bibId};			
	var url = 'http://catalog.loc.gov/vwebv/holdingsInfo?bibId=' + bibId;
	var html = Meteor.http.get(url).content;
	if (html) {
		console.log('cheerio:' + bibId);
		var $ = cheerio.load(html);

		// Find the bibId
//		var href = $('a[class=request_action]').first().attr('href');
//		if (href) {
//		book.bibId = href.match(/bibId=[0-9]+/)[0].substring(6);					
//		console.log('href ' + href);
		// Find the rest of the info
		book.author = $('th').filter(function (i, el) {
			return $(this).text() === 'Personal name';
		}).next().find('span').text();

		book.fullTitle = titleize($('th').filter(function (i, el) {
			return $(this).text() === 'Main title';
		}).next().find('span').text());
		book.title = book.fullTitle.match(/[^\/]+/)[0].trim();

		book.isbn = $('h2').filter(function (i, el) {
			return $(this).text() === 'ISBN';
		}).next().find('span').first().text().match(/[0-9]+/)[0];

		var pages = $('h2').filter(function(i,el){
			return $(this).text() === 'Description';
		}).next().find('span').text();
		pages = pages.match(/[0-9]+ p./);
		if (pages) { book.pages = pages[0].match(/[0-9]+/)[0]; }

		var year = $('th').filter(function(i,el){ return $(this).text().indexOf('Published') === 0; }).next().find('span').text();
		book.year = year.match(/[0-9]{4}/)[0];

		var subj = $('h2').filter(function(i,el){ return $(this).text() === 'Subjects'; }).next().find('span');
		book.subjects = [];
		subj.each(function (i, el) {
			book.subjects.push($(el).text());	
		});

		book.links = $('h2').filter(function(i,el){ return $(this).text() === 'Links'; }).next().html();	

		Books.insert(book, function(err, res) {
			if (err) {
				console.log('Books insert error: ' + err);
			} else {
				console.log('Books insert success: ' + res);
			}
		});
		return book;
	} else {
		console.log('searchLOCbibIb error');
	}
};

