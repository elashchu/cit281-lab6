class Book {
  constructor(title, author, pubDate, isbn) {
    this.title = title;
    this.author = author;
    this.pubDate = pubDate;
    this.isbn = isbn;
  }
}

class Library {
  constructor(name) {
    this._name = name;
    this._books = [];
  }
  get books() {
    // Return copy of books
    return JSON.parse(JSON.stringify(this._books));
  }
  get count() {
    return this._books.length;
  }
  addBook(book = {}) {
    const { title = "", author = "", pubDate = "", isbn = "" } = book;
    if (title.length > 0 && author.length > 0) {
      const newBook = { title, author, pubDate, isbn }; //or const newBook = new Book(title, author, pubDate, isbn)
      this._books.push(newBook);
    }
  }
  deleteBook(isbn) {
    /* 
    //(1) Find index of book with given isbn within the "_books" array
     let indexOfBookToRemove = null;
     let index = 0;
     for (const book of this._books) {
       if (book.isbn == isbn) {
         indexOfBookToRemove = "Something";
         break;
       }
      index += 1;
    }  
    */

    //alternative
    let indexOfBookToRemove = null;
    for (let index = 0; index < this._books.length; index++) {
      const book = this._books[index];
      if (book.isbn == isbn) {
        indexOfBookToRemove = index;
        break;
      }
    }

    /*
        variable = null
        loop (for/while) {
            if (filtering) {
                modify/update variable

                (poetntionally -- exit loop early)
            }
        }
        //variable is ready to go
    */

    //(2) Once index has been found, remove entry from "_books"
    this._books.splice(indexOfBookToRemove, 1);
  }
  listBooks() {
    for (const book of this._books) {
      const { title, author, pubDate, isbn } = book;
      console.log(
        `Title: ${title}, Author: ${author}, PubDate: ${pubDate}, ISBN: ${isbn}`
      );
    }
  }
}

// Create books
const myBook = new Book(
  (title = "Misery"),
  (author = "Stephen King"),
  (pubDate = "2010"),
  (isbn = "1234567890")
);
const atomicHabits = new Book(
  "Atomic Habits",
  "James Clear",
  "10/16/2018",
  (isbn = "0735211299")
);
const theHillWeClimb = new Book(
  "The Hill We Climb",
  "David Baldacci",
  "03/30/2021",
  "059346527X"
);
const oceanPrey = new Book(
  "Atomic Habits",
  "John Sandford",
  "04/13/2021",
  "1398505501"
);

//Create a Library
let uoLibrary = new Library("Knight Library");

// Add book to library and output library count and books
console.log("Adding Books");
uoLibrary.addBook(myBook);
uoLibrary.addBook(atomicHabits);
uoLibrary.addBook(theHillWeClimb);
uoLibrary.addBook(oceanPrey);
console.log(`Book count: ${uoLibrary.count}`);
uoLibrary.listBooks();

// Delete a book and output library books
console.log("* Library after delete *");
uoLibrary.deleteBook("059346527X");
uoLibrary.listBooks();