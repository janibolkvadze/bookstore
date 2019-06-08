import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const DELETE_BOOK = gql`
  mutation DeleteBook($bookId: Int!) {
    deleteBook(bookId: $bookId) {
        bookId
    }
  }
`;

const deleteBook = (props) => {

  return (
    <Mutation
        mutation={DELETE_BOOK}
        onCompleted={(data) => {
            document.getElementById(data.deleteBook.bookId).remove();
        }}
    >
      {(deleteBook, { data }) => (
        <button
            className="removeBook"
            onClick={() => {
                deleteBook({ variables: { bookId: props.bookId } });
            }}
        >Remove</button>

      )}
    </Mutation>
  );
};

export default deleteBook;
