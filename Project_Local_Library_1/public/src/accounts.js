function findAccountById(accounts, id) {
  return accounts.find((account) => id === account.id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort(function (a, b) {
    if(a.name.last.toLowerCase() === b.name.last.toLowerCase())
    {
      return 0;
    }

    return a.name.last.toLowerCase() < b.name.last.toLowerCase() ? -1 : 1;
  });
}

function numberOfBorrows(account, books) {
  let total = 0;
  books.forEach(function (book) {
    book.borrows.forEach(function (borrow) {
      if (account.id === borrow.id) {
        total++;
      }
    });
  });
  return total;
}

function getBooksPossessedByAccount(account, books, authors) {
  // Filter books by account and by checkout status
  let checkedOutBooks = books.filter((book) => { // Are there any books
    return book.borrows.some((borrow) => { // Where at least one borrow
      return borrow.id === account.id && !borrow.returned; // matches the given account and is currently checked out
    });
  });

  // Attach author to books in results array
  let results = [];
  checkedOutBooks.forEach((book) => {
    let author = authors.find((author) => author.id === book.authorId);
    let bookCopy = { ...book }; // Use spread here to avoid side-effects
    bookCopy.author = author;
    results.push(bookCopy);
  });

  // Return the checked out books with authors attached
  return results;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  numberOfBorrows,
  getBooksPossessedByAccount,
};
