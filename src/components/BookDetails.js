import React from 'react';
import { useQuery } from '@apollo/client';
import { getBookQuery } from '../queries/queries'

function BookDetails({ bookId }) {
    console.log({bookId});

    const { data } = useQuery(getBookQuery, {
        variables: { id: "5f61f64c23bac638bd00e960" },
      });

    const displayBookDetails = () => {
        console.log({data});

        if (data) {
            const { book } = data;
            return(
            <div>
                <h2>{book.name}</h2>
                <p>Genre: {book.genre}</p>
                <p>By: {book.author.name}</p>
                <p>All books by this author:</p>
                <ul className="other-books">
                    {book.author.books.map(item => {
                        return <li key={item.id}>{item.name}</li>
                    })

                    }
                </ul>
            </div>
            )
        } else {
            return <div>Select a book to view details</div>
        }
    }
    return (
      
        <div id="book-details">
          {displayBookDetails()}
        </div>
      
    );
  }

export default BookDetails;
