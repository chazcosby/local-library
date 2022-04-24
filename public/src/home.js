function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}
 
function getBooksBorrowedCount(books) {
  let borrowedBooks = books.filter(
    (book) => book.borrows[0].returned === false
  );
  return borrowedBooks.length;
}

//helper function
let helper = function (element) {
  element.sort((obj1, obj2) => (obj1.count > obj2.count ? -1 : 1));
};

function getMostCommonGenres(books) {
  let littleHelper = books.map((book) => book.genre); //helper function usage
  let commonGenres = [];
  littleHelper.forEach((genre) => {
    let created = commonGenres.findIndex((genreObj) => genreObj.name === genre);
    created >= 0
      ? commonGenres[created].count++
      : commonGenres.push({ name: genre, count: 1 });
  });
  return commonGenres.sort((obj1, obj2) => obj2.count - obj1.count).slice(0, 5);
}

function getMostPopularBooks(books) {
  const mostPop = books.map((book) => ({
    name: book.title,
    count: book.borrows.length,
  }));
  return mostPop.sort((obj1, obj2) => obj2.count - obj1.count).slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  let authorCounts = {};
  let authorList = [];
  for (let author of authors) {
    for (let book of books) {
      if (author.id === book.authorId) {
        let current = authorCounts[`${author.name.first} ${author.name.last}`];
        if (current) {
          authorCounts[`${author.name.first} ${author.name.last}`] =
            current + book.borrows.length;
        } else {
          authorCounts[`${author.name.first} ${author.name.last}`] =
            book.borrows.length;
        }
      }
    }
  }
  for (let item in authorCounts) {
    authorList.push({ name: item, count: authorCounts[item] });
  }
  return authorList
    .sort((highCount, lowCount) => lowCount.count - highCount.count)
    .slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
