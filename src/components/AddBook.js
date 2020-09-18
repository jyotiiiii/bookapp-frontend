import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { getAuthorsQuery, addBookMutation, getBooksQuery } from "../queries/queries";

function AddBook() {
  const [newName, setNewName] = useState("");
  const [newGenre, setNewGenre] = useState("");
  const [newAuthorId, setNewauthorId] = useState("");

  const { loading, error, data } = useQuery(getAuthorsQuery);
  const [addEntry] = useMutation(addBookMutation);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ newName });
    console.log({ newGenre });
    console.log({ newAuthorId });

    addEntry({variables: {
        name: newName,
        genre: newGenre,
        authorId: newAuthorId
    },
    //makes sure new entry is rendered on submit
    refetchQueries: [{query: getBooksQuery}]
});

  };

  const displayAuthors = () => {
    if (loading) return <option>Loading Authors...</option>;
    if (error) return <p>Error</p>;
    if (data)
      return data.authors.map(({ name, id }) => {
        return (
          <option key={id} value={id}>
            {name}
          </option>
        );
      });
  };

  return (
    <form id="add-book" onSubmit={handleSubmit}>
      <div className="field">
        <label>Book name:</label>
        <input type="text" onChange={(e) => setNewName(e.target.value)} />
      </div>

      <div className="field">
        <label>Genre:</label>
        <input type="text" onChange={(e) => setNewGenre(e.target.value)} />
      </div>

      <div className="field">
        <label>Author:</label>
        <select onChange={(e) => setNewauthorId(e.target.value)}>
          <option>Select author</option>
          {displayAuthors()}
        </select>
      </div>

      <button>+</button>
    </form>
  );
}

export default AddBook;
