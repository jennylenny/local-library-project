function findAuthorById(authors, id) {
  return authors.find((author) => id === author.id);
}

function findBookById(books, id) {
  return books.find((book) => id === book.id);
}

function partitionBooksByBorrowedStatus(books) {
  let borrowedBooks = books.filter((book) => {
    return book.borrows.some((borrow) => !borrow.returned);
  });
  let returnedBooks = books.filter((book) => {
    return !book.borrows.some((borrow) => !borrow.returned);
  });
  return [borrowedBooks, returnedBooks];
}

function getBorrowersForBook(book, accounts) {
  let borrowers = [];

  book.borrows.forEach((borrow) => {
    let account = accounts.find((account) => borrow.id === account.id);
    let accountCopy = { ...account }; // Use spread here to avoid side-effects
    accountCopy.returned = borrow.returned;

    borrowers.push(accountCopy);
  });

  return borrowers.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
