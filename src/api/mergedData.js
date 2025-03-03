import { getAuthorBooks, getSingleAuthor, deleteSingleAuthor } from './authorData';
import { getSingleBook, deleteBook, publicBooks, getBooks } from './bookData';

const viewBookDetails = (bookFirebaseKey) =>
  new Promise((resolve, reject) => {
    getSingleBook(bookFirebaseKey)
      .then((bookObject) => {
        getSingleAuthor(bookObject.author_id).then((authorObject) => {
          resolve({ authorObject, ...bookObject });
        });
      })
      .catch((error) => reject(error));
  });

const viewAuthorDetails = (authorFirebaseKey) =>
  new Promise((resolve, reject) => {
    Promise.all([getSingleAuthor(authorFirebaseKey), getAuthorBooks(authorFirebaseKey)])
      .then(([authorObject, authorBooksArray]) => {
        resolve({ ...authorObject, books: authorBooksArray });
      })
      .catch((error) => reject(error));
  });

const deleteAuthorBooks = (authorId) =>
  new Promise((resolve, reject) => {
    getAuthorBooks(authorId)
      .then((booksArray) => {
        const deleteBookPromises = booksArray.map((book) => deleteBook(book.firebaseKey));

        Promise.all(deleteBookPromises).then(() => {
          deleteSingleAuthor(authorId).then(resolve);
        });
      })
      .catch((error) => reject(error));
  });

const getPublicPrivateBooks = (uid) =>
  new Promise((resolve, reject) => {
    Promise.all([getBooks(uid), publicBooks(uid)])
      .then(([privateBooksArray, publicBooksArray]) => {
        const allBooksArray = [...privateBooksArray, ...publicBooksArray];
        resolve(allBooksArray);
      })
      .catch((error) => reject(error));
  });

const getBooksInCart = (uid) =>
  new Promise((resolve, reject) => {
    getPublicPrivateBooks(uid)
      .then((booksInCart) => {
        const books = booksInCart.filter((book) => book.cart);
        resolve(books);
      })
      .catch((error) => reject(error));
  });

export { viewBookDetails, viewAuthorDetails, deleteAuthorBooks, getPublicPrivateBooks, getBooksInCart };
