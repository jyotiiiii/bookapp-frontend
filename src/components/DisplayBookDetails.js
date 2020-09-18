import React from "react";
import { useQuery } from "@apollo/client";
import { getBookQuery } from "../queries/queries";

const DisplayBookDetails = ({ bookId }) => {
  const { data } = useQuery(getBookQuery, {
    variables: { id: bookId },
  });

  console.log('DisplayBookDetails data:', data !== undefined );



    if (data !== undefined) {
            const { book } = data;
    return (
      <div>
        <h2>{book.name}</h2>
        <p>Genre: {book.genre}</p>
        <p>By: {book.author.name}</p>
        <p>All books by this author:</p>
        <ul className="other-books">
          {book.author.books.map((item) => {
            return <li key={item.id}>{item.name}</li>;
          })}
        </ul> 
      </div>

    );
    } else {
        return <p>No book</p>
    }
};
export default DisplayBookDetails;
