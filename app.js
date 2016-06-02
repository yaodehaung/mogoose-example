var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Book = require('./Book.model');

var port = 3000;
var db = 'mongodb://localhost/example'

mongoose.connect(db);
// 建立連接
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function(req, res) {
  res.send('happy to be here');
});

app.get('/books', function(req, res) {
  console.log('getting all books');
  Book.find({})
    .exec(function(err, books) {
	// exec 等於執行
      if(err) {
        res.send('error occured')
      } else {
        console.log(books);
        res.json(books);
      }
    });
});

app.get('/books/:id', function(req, res) {
  console.log('getting all books');
  Book.findOne({
    _id: req.params.id
    })
    .exec(function(err, books) {
      if(err) {
        res.send('error occured')
      } else {
        console.log(books);
        res.json(books);
      }
    });
});

app.post('/book', function(req, res) {

 var book = {
	title : req.body.title,
	author : req.body.author,
	category : req.body.category
 };

  var newBook = new Book(book);
  

  //newBook.title = req.body.title;
  //newBook.author = req.body.author;
  //newBook.category = req.body.category;

  newBook.save(function(err, book) {
    if(err) {
      res.send('error saving book');
    } else {
      console.log(book);
      res.send(book);
    }
  });
});

app.post('/book2', function(req, res) {
  Book.create(req.body, function(err, book) {
    
  if(err) {
      res.send('error saving book');
    } else {
      console.log(book);
      res.send(book);
    }
  });
});

app.put('/book/:id', function(req, res) {
 Book.findOne({_id : req.params.id},function(err,book){
  	if(err){
		res.send("err");
	}else {
		console.log(book.author);
  		book.author = "yaode";
		book.save();
		res.send(book.author);
		// 先找到資料 然後再重新存檔
	}
  })
});

app.delete('/book/:id', function(req, res) {
  Book.findOneAndRemove({
    _id: req.params.id
  }, function(err, book) {
    if(err) {
      res.send('error removing')
    } else {
      console.log(book);
      res.send(book);
    }
  });
});

app.listen(port, function() {
  console.log('app listening on port ' + port);
});
