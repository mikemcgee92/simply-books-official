'use client';

import React, { useEffect, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';

import { useAuth } from '@/utils/context/authContext';
import { Button } from 'react-bootstrap';
import { getBooksInCart } from '../../api/mergedData';
import { updateBook } from '../../api/bookData';

export default function Cart() {
  const [books, setBooks] = useState([]);
  const [total, setTotal] = useState(0);
  const { user } = useAuth();

  const getAllTheBooks = () => {
    getBooksInCart(user.uid).then(setBooks);
  };

  const getTotal = () => {
    setTotal(0);
    books.map((book) => setTotal((prevState) => prevState + Number(book.price)));
  };

  useEffect(() => {
    getAllTheBooks();
  }, []);

  useEffect(() => {
    getTotal();
  }, [books]);

  const checkout = (arr) => {
    console.log('CHECKOUT');
    arr.map((book) => updateBook({ ...book, cart: false }).then(() => getAllTheBooks()));
  };

  return (
    <div className="text-center my-4">
      <ListGroup variant="flush">
        {books.map((book) => (
          <ListGroup.Item key={book.firebaseKey}>
            {book.title} <Badge bg="dark">${book.price}</Badge>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <h2>Total: ${total.toFixed(2)}</h2>
      <Button variant="success" onClick={() => checkout(books)}>
        CHECK OUT
      </Button>
    </div>
  );
}
