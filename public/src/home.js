const genreListLength = 5;
const bookListLength = 5;
const authorListLength = 5;

// Helper function to sort an array by item count & by length passed in
function sortAndShorten(list, length) {
  return list
    .sort((itemA, itemB) => (itemA.count < itemB.count ? 1 : -1))
    .slice(0, length);
}

// Returns the total amount of elements in 'books' array
const getTotalBooksCount = books => books.length;

// Returns the total amount of elements in 'accounts' array
const getTotalAccountsCount = accounts => accounts.length;

/* Displays the total number of books currently borrowed
  - uses reduce() to count the number of books in 'books' array that
    have 'returned: false' in the first element of their 'borrows' array
*/
function getBooksBorrowedCount(books) {
  return books.reduce((borrowCount, { borrows }) => {
    if (!borrows[0].returned) borrowCount++;
    return borrowCount;
  }, 0);
}

function getMostCommonGenres(books) {
  const genresObj = books
    .map(({ genre }) => genre) // > [genre1, genre2,...]
    .reduce((genreCount, genre) => {
      genreCount[genre] > 0 ? genreCount[genre]++ : (genreCount[genre] = 1);
      return genreCount;
    }, {});
  // > { genre1: n, genre2: n,...}

  /* Displays the 5 most common genres of books
  - uses map() to create a new array of just the genre's of each book object in book array and
    reduce() to create a new object that counts the number of times each genre appears in the array
    - stores each genre as a key and number of times it appears as value
  - create array genreList to store each genre object
  - loops through genreObj object and adds new object in genreList with keys as 'name:' and 'count' 
    along with corresponding values for each genre
  - returns array sorted by highest count and limited to 5 elements
*/
  const genreList = [];
  for (let genre in genresObj) {
    genreList.push({
      name: genre,
      count: genresObj[genre],
    });
  } // > [ {name: "genre1", count: n}, {name: "genre2", count: n},... ]

  return sortAndShorten(genreList, genreListLength);
}

/* List the 5 most popular books based on number of times borrowed
  - creates new array 'popularBooks' to store new book objects
  - sorts books array by number of borrows
  - limits the array to 5 elements
  - loops through array and creates new book count object and adds it to 'popularBooks'
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

/* (Helper) Get an author's name by their ID
  - search authors array from ID entered in argument 
    and user template literal to create a string of the author's name
  - used in getMostPopularAuthors()
*/
function findAuthorNameById(authors, authorId) {
  const author = authors.find(({ id }) => id === authorId);
  return `${author.name.first} ${author.name.last}`;
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

  return sortAndShorten(authorList, authorListLength);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
