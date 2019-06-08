import React from "react";

import { Query } from 'react-apollo';
import {gql} from 'apollo-boost';

import RemoveBook from './removeBook';

const Books = () => (
    <div>
        <div id="books">
        <h1 className="booksInStock">Books in stock:</h1>
        <Query query={GET_BOOKS_QUERY}>
            {
                ({ data, loading, error }) => {
                if (loading) return <div>Loading...</div>
                if (error) return <div>Error</div>

                return data.books.map(book => {
                        return (
                            <div className="book" key={book.id} id={book.id}>
                                <div className="bookImage">
                                    <img src={book.imageUrl} width="75" alt={book.title} />
                                </div>
                                <div className="bookInfo">
                                    <h3>{book.title}</h3>
                                    {book.description}<br />
                                </div>
                                <div className="bookControll">
                                    <RemoveBook bookId={book.id} />
                                </div>
                            </div>);
                    })
                }
            }
        </Query>
        </div>
    </div>
);

const GET_BOOKS_QUERY = gql `
    {
        books {
            id,
            title,
            description,
            imageUrl
        }
    }
`;

export default Books;
