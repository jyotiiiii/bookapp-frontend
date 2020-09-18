import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { getBooksQuery } from "../queries/queries";

//components
import BookDetails from "./BookDetails";

function BookList() {
  const { loading, error, data } = useQuery(getBooksQuery);
  const [selected, setSelected] = useState(null);

  const displayBooks = () => {
    if (loading) return <option>Loading Books...</option>;
    if (error) return <p>Error</p>;
    if (data)
      return data.books.map(({ name, id }) => {
        return (
          <li
            key={id}
            onClick={(e) => {
              setSelected({ id })
            }}
          >
            {name}
          </li>
        );
      });
  };

  return (
    <div>
      <ul id="book-list">{displayBooks()}</ul>
      <BookDetails bookId={selected} />
    </div>
  );
}

export default BookList;
