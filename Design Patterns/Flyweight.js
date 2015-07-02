//  source: Learning javascript design patterns

// Exemplo de como o flyweight pode ser aplicado para diminuir o consumo de memoria

var Book = function( id, title, author, genre, pageCount,publisherID, ISBN, checkoutDate, checkoutMember){
	this.id = id;
	this.title = title;
	this.author = author;
	this.genre = genre;
	this.pageCount = pageCount;
	this.publisherID = publisherID;
	this.ISBN = ISBN;
	this.checkoutDate = checkoutDate;
	this.checkoutMember = checkoutMember;
	this.dueReturnDate = dueReturnDate;
	this.availability = availability;
};

Book.prototype = {
	getTitle:function(){
		return this.title;
	},
	getAuthor: function(){
		return this.author;
	},
	getISBN: function(){
		return this.ISBN;
	},
	// other getters not shown for brevity
	updateCheckoutStatus: function(bookID, newStatus, checkoutDate,checkoutMember, newReturnDate){
		this.id = bookID;
		this.availability = newStatus;
		this.checkoutDate = checkoutDate;
		this.checkoutMember = checkoutMember;
		this.dueReturnDate = newReturnDate;
	},
	extendCheckoutPeriod: function(bookID, newReturnDate){
		this.id = bookID;
		this.dueReturnDate = newReturnDate;
	},
	isPastDue: function(bookID){
		var currentDate = new Date();
		return currentDate.getTime() > Date.parse(this.dueReturnDate);
	}
};

//FlyWeight separa a parte intrinsica do livro e a parte extrinsica. Fazendo um trabalho semelhante `a normalizacao
// de banco de dados.

// flyweight optimized version
var Book = function (title, author, genre, pageCount, publisherID, ISBN) {
	this.title = title;
	this.author = author;
	this.genre = genre;
	this.pageCount = pageCount;
	this.publisherID = publisherID;
	this.ISBN = ISBN;
};

// Book Factory singleton
var BookFactory = (function () {
	var existingBooks = {};
	return {
		createBook: function (title, author, genre, pageCount, publisherID, ISBN) {
			// Find out if a particular book meta-data combination has been created before
			var existingBook = existingBooks[ISBN];
			if (existingBook) {
				return existingBook;
			} else {
				// if not, let's create a new instance of it and store it
				var book = new Book(title, author, genre, pageCount, publisherID, ISBN);
				existingBooks[ISBN] = book;
				return book;
			}
		}
	}
})();


// BookRecordManager singleton
var BookRecordManager = (function () {
	var bookRecordDatabase = {};
	return {
		// add a new book into the library system
		addBookRecord: function (id, title, author, genre, pageCount, publisherID, ISBN, checkoutDate, checkoutMember,dueReturnDate,availability)
			var book = bookFactory.createBook(title, author, genre, pageCount, publisherID, ISBN);
			bookRecordDatabase[id] = {
			checkoutMember: checkoutMember,
			checkoutDate: checkoutDate,
			dueReturnDate: dueReturnDate,
			availability: availability,
			book: book;
		};
		},
		updateCheckoutStatus: function (bookID, newStatus, checkoutDate, checkoutMember, newReturnDate) {
			var record = bookRecordDatabase[bookID];
			record.availability = newStatus;
			record.checkoutDate = checkoutDate;
			record.checkoutMember = checkoutMember;
			record.dueReturnDate = newReturnDate;
		},
		extendCheckoutPeriod: function (bookID, newReturnDate) {
			bookRecordDatabase[bookID].dueReturnDate = newReturnDate;
		},
		isPastDue: function (bookID) {
			var currentDate = new Date();
			return currentDate.getTime() > Date.parse(bookRecordDatabase[bookID].dueReturnDate);
		}
	};
})();

//se tivermos 30 copias do mesmo livro, apenas estamos armazenando as propriedades intrinsecas uma vez.


//.........................*****.............................

/*
<div id="container">
	<div class="toggle" href="#">More Info (Address)
		<span class="info">
		This is more information
		</span>
	</div>
	<div class="toggle" href="#">Even More Info (Map)
		<span class="info">
			<iframe src="http://www.map-generator.net/extmap.php?name=London&amp;address=london%2C%20engla
		</span>
	</div>
</div>
*/

//se tivermos varios elementos toggle, que responderao da mesma maneira ao evento click, podemos centralizar 
// os handlers em um so objeto. No caso a centralizacao esta atrelada(bind) `a div container que cont´em esses
//elementos.

var stateManager = {
    fly: function () {
        var self = this;
        $('#container').unbind().bind("click", function (e) {
            var target = $(e.originalTarget || e.srcElement);
            if (target.is("div.toggle")) {
                self.handleClick(target);
            }
        });
    },
    handleClick: function (elem) {
        elem.find('span').toggle('slow');
    }
});








