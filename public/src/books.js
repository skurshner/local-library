const findAuthorById = (authors, authorId) => authors.find(({ id }) => id === authorId);
/* Finds an author by their ID
  - gets the author object that matches the authorID in argument
*/

const findBookById = (books, bookId) => books.find(({ id }) => id === bookId);
/* Finds a book by its ID
  - gets the book object that matches the bookID in argument
*/

function partitionBooksByBorrowedStatus(books) {
  const partitionedBooks = [];
  partitionedBooks.push(
    books.filter(({ borrows }) => !borrows[0].returned),
    books.filter(({ borrows }) => borrows[0].returned)
  );
  return partitionedBooks;
}
/* Organize the 'books' array by borrowed status
  - create an array to store partitioned list
  - add filtered versions of the 'books' array based on borrow status 
    to the partition array
*/

const findAccountById = (accounts, accountId) =>
  accounts.find(({ id }) => id === accountId);
/* (Helper) Find an account by their ID
  - locate account with ID entered in argument 
  - used in getBorrowersForBook()
*/

function getBorrowersForBook({ borrows }, accounts) {
  const bookBorrowers = [];
  borrows.forEach((borrower) => {
    borrower = {
      ...borrower,
      ...findAccountById(accounts, borrower.id),
    };
    bookBorrowers.push(borrower);
  });
  return bookBorrowers.slice(0, 10);
}
/* Get the detailed account info for each borrower of a book
  - create an array to list the book's borrowers 
  - loop through the 'borrows' array for the book entered in argument
    - update the borrower object to include the account information using helper function
    - add it to the book's borrowers array
    - display only the last 10
*/

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
