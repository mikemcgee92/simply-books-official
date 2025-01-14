'use client';

import React, { useEffect, useState } from 'react';
import { viewAuthorDetails } from '@/api/mergedData';
import PropTypes from 'prop-types';
import BookCard from '@/components/BookCard';
import { getBooksByAuthor } from '../../../api/bookData';

export default function ViewAutor({ params }) {
  const [authorDetails, setAuthorDetails] = useState({});
  const [authorBooks, setAuthorBooks] = useState([]);

  // grab firebaseKey from url
  const { firebaseKey } = params;

  // make call to API layer to get the data
  useEffect(() => {
    viewAuthorDetails(firebaseKey).then(setAuthorDetails).then(getBooksByAuthor(firebaseKey).then(setAuthorBooks));
  }, [firebaseKey]);

  return (
    <div>
      <h1>
        {authorDetails.first_name} {authorDetails.last_name}
      </h1>
      <h4> {authorDetails.favorite ? 'Favorite 🤍' : ''}</h4>
      <img src={authorDetails.image} alt={authorDetails.first_name} style={{ width: '300px' }} />
      <br />
      {authorDetails.email} <br />
      <div className="d-flex flex-wrap">
        {authorBooks.map((book) => (
          <BookCard key={book.firebaseKey} bookObj={book} />
        ))}
      </div>
    </div>
  );
}

ViewAutor.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
