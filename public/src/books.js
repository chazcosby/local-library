function findAuthorById(authors, id) {
  let result = authors.find((author) => author.id === id);
  return result;
}

function findBookById(books, id) {
  let result = books.find((book) => book.id === id);
  return result;
}

function partitionBooksByBorrowedStatus(books) {
  let borrowedBooks = [];
  let returnedBooks = [];
  let result = [];
  books.forEach((book) => {
    let isBookReturned = book.borrows[0].returned;
    isBookReturned ? borrowedBooks.push(book) : returnedBooks.push(book);
  });
  result.push(returnedBooks);
  result.push(borrowedBooks);
  return result;
}

function getBorrowersForBook(book, accounts) {
  let result = [];
  book.borrows.forEach((borrowed) => {
    let account = accounts.find((account) => account.id === borrowed.id);
    account.returned = borrowed.returned;
    result.push(account);
  });
  return result.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
