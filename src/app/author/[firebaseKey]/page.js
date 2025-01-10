'use client';

import React, { useEffect, useState } from 'react';
import { viewAuthorDetails } from '@/api/mergedData';
import PropTypes from 'prop-types';

export default function ViewAutor({ params }) {
  const [authorDetails, setAuthorDetails] = useState({});

  // grab firebaseKey from url
  const { firebaseKey } = params;

  // make call to API layer to get the data
  useEffect(() => {
    viewAuthorDetails(firebaseKey).then(setAuthorDetails);
  }, [firebaseKey]);

  return <div>{authorDetails.email}</div>;
}

ViewAutor.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
