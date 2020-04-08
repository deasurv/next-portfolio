const Book = require('./../models/book');

exports.getBooks = (req, res) => {
    Book.find({}, (error, allBooks) => {
        if(error){
            return res.status(422).send(error);
        }
        return res.json(allBooks);
    });
};

exports.saveBook = (req, res) => {
    const bookData = req.body;
    const book = new Book(bookData);

    book.save((error, createdBook) => {
        if(error){
            return res.status(422).send(error);
        }
        return res.json(createdBook);
    });
};

exports.updateBook = (req, res) =>{
    const bookID = req.params.id;
    const bookData = req.body;

    Book.findById(bookID, (error, foundBook) => {
        if(error){
            return res.status(422).send(error);
        }

        foundBook.set(bookData);
        foundBook.save((error, savedBook) => {
            if(error){
                return res.status(422).send(error);
            }
            return res.json(savedBook);
        })
    });
};

exports.deleteBook = (req, res) => {
    const bookID = req.params.id;

    Book.deleteOne({_id: bookID}, (error, deletedBook) => {
        if(error){
            return res.status(422).send(error);
        }
        return res.json({
            status: 1,
            details: 'book deleted!'
        }); 
    });
};