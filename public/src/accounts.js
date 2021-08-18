const findAccountById = (accounts, accountId) =>
  accounts.find(({ id }) => id === accountId);
/* Find an account by their ID
  - uses find() to locate account with ID entered in argument 
*/

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) =>
    accountA.name.last > accountB.name.last ? 1 : -1
  );
}
/* Sort accounts by account holder's last name
    - uses sort() to sort 'accounts' array by account's last name 
*/

function getTotalNumberOfBorrows(account, books) {
  return books.reduce((borrowCount, { borrows }) => {
    if (borrows.some(({ id }) => id === account.id)) {
      borrowCount++;
    }
    return borrowCount;
  }, 0);
}
/* Get the total number of books that an account has borrowed
  - uses reduce() to count the total number of times the ID for account argument
    appears in the 'borrows' array of each book object in 'books' array 
*/

const findAuthorById = (authors, authorId) => authors.find(({ id }) => id === authorId);
/* (Helper) Finds an author by their ID
  - get the author object that matches the authorID in argument
  - used in getBooksPossessedByAccount()
*/

function getBooksPossessedByAccount({ id }, books, authors) {
  const borrowedBooks = [];
  books
    .filter(({ borrows }) => borrows[0].id === id && !borrows[0].returned)
    .forEach((book) => {
      const author = findAuthorById(authors, book.authorId);
      book = {
        ...book,
        author: author,
      };
      borrowedBooks.push(book);
    });

  return borrowedBooks;
}
/* Finds the books (with detailed author information) currently checked out by an account
  - create a new array 'borrowedBooks' to store book objects of borrowed books
  - filter the 'books' array for only books who have the account's ID in their 'borrows' array
    and are not returned
  - update the book objects to include the author information, then adding them to 'borrowedBooks' array
*/

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
