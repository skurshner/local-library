const genreListLength = 5;
const bookListLength = 5;

const getTotalBooksCount = books => books.length;
// Returns the total amount of elements in 'books' array

const getTotalAccountsCount = accounts => accounts.length;
// Returns the total amount of elements in 'accounts' array

function getBooksBorrowedCount(books) {
  return books.reduce((borrowCount, { borrows }) => {
    if (!borrows[0].returned) borrowCount++;
    return borrowCount;
  }, 0);
}
/* Displays the total number of books currently borrowed
  - uses reduce() to count the number of books in 'books' array that
    have 'returned: false' in the first element of their 'borrows' array
*/

function getMostCommonGenres(books) {
  const genresObj = books
    .map(({ genre }) => genre) // > [genre1, genre2,...]
    .reduce((genreCount, genre) => {
      genreCount[genre] > 0 ? genreCount[genre]++ : (genreCount[genre] = 1);
      return genreCount;
    }, {});
  // > { genre1: n, genre2: n,...}

  const genreList = [];
  for (let genre in genresObj) {
    genreList.push({
      name: genre,
      count: genresObj[genre],
    });
  } // > [ {name: "genre1", count: n}, {name: "genre2", count: n},... ]

  return genreList
    .sort((genreA, genreB) => (genreA.count < genreB.count ? 1 : -1))
    .slice(0, genreListLength);
}
/* Displays the 5 most common genres of books
  - uses map() to create a new array of just the genre's of each book object in book array and
    reduce() to create a new object that counts the number of times each genre appears in the array
    - stores each genre as a key and number of times it appears as value
  - create array genreList to store each genre object
  - loops through genreObj object and adds new object in genreList with keys as 'name:' and 'count' 
    along with corresponding values for each genre
  - returns array sorted by highest count and limited to 5 elements
*/

function getMostPopularBooks(books) {
  return books
    .sort((bookA, bookB) => (bookA.borrows.length < bookB.borrows.length ? 1 : -1))
    .slice(0, bookListLength)
    .map(({ title, borrows }) => {
      return {
        name: title,
        count: borrows.length,
      };
    });
}
/* List the 5 most popular books based on number of times borrowed
  - creates new array 'popularBooks' to store new book objects
  - sorts books array by number of borrows
  - limits the array to 5 elements
  - loops through array and creates new book count object and adds it to 'popularBooks'
*/

function findAuthorNameById(authors, authorId) {
  const author = authors.find(({ id }) => id === authorId);
  return `${author.name.first} ${author.name.last}`;
}
/* (Helper) Get an author's name by their ID
  - search authors array from ID entered in argument 
    and user template literal to create a string of the author's name
  - used in getMostPopularAuthors()
*/

function getMostPopularAuthors(books, authors) {
  const authorObj = books.reduce((authorCount, { authorId, borrows }) => {
    !authorCount[authorId]
      ? (authorCount[authorId] = borrows.length)
      : authorCount[authorId] + borrows.length;
    return authorCount;
  }, {}); // > { 'AuthorID1':n, 'AuthorID2':n,...}

  const authorList = [];
  for (let authorId in authorObj) {
    authorList.push({
      name: findAuthorNameById(authors, parseInt(authorId)),
      count: authorObj[authorId],
    }); // > [ {name: "Author1", count: n}, {name: "Author2", count: n},... ]
  }
  return authorList
    .sort((authorA, authorB) => (authorA.count < authorB.count ? 1 : -1))
    .slice(0, 5);
}
/* Displays the 5 most popular authors by total borrow count of their books
  - uses reduce() on 'books' array to create a new object that groups the author name 
    with the total number of borrows of their books
    - stores each auther's name as a key and total number of borrows as value
  - create array authorList to store each author object
  - loops through authorObj object and adds new object in authorList with keys as 'name:' and 'count' 
    along with corresponding values for each genre
  - returns array sorted by highest count and limited to 5 elements
*/

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
