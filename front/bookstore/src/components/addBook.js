import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const ADD_BOOK = gql`
  mutation DeleteBook($title: String!, $description: String!, $imageUrl: String!) {
    createBook (title: $title,description: $description,imageUrl: $imageUrl) {
        book {
          id
          title
          description
          imageUrl
        }
    }
  }
`;

class CreateBook extends Component {
    render() {
    let title;
    let description;
    let imageUrl;
        return (
            <Mutation
                mutation={ADD_BOOK}
                onCompleted={(data) => {
                    let el = document.createElement('div');
                    el.innerHTML = `
                        <div class="book" id=${data.createBook.book.id}>
                                <div class="bookImage">
                                    <img src="${data.createBook.book.imageUrl}" width="75" alt="${data.createBook.book.title}" />
                                </div>
                                <div class="bookInfo">
                                    <h3>${data.createBook.book.title}</h3>
                                    ${data.createBook.book.description}<br />
                                </div>
                                <div class="bookControll">
                                    <button
                                        class="removeBook"
                                    >Remove</button>
                                </div>
                        </div>`;
                    document.getElementById('books').appendChild(el);
                }}
            >
              {(createBook, { data }) => (
                    <div className="createNew">
                        <h2 className="addNewBook">
                            Add new book
                        </h2>
                        <form
                            className="removeBook"
                            onSubmit={(e) => {
                                e.preventDefault();
                                createBook({ variables: {
                                    title: title.value,
                                    description: description.value,
                                    imageUrl: imageUrl.value,
                                } });
                            }}
                        >
                            <input ref={node => { title = node; }} type="text" name="name" autoComplete="off" placeholder="Name" /><br />
                            <input ref={node => { description = node; }} type="text" name="description" autoComplete="off" placeholder="Description" /><br />
                            <input ref={node => { imageUrl = node; }} type="text" name="imageUrl" autoComplete="off" placeholder="URL of the image" /><br />
                            <button>Submit</button>
                        </form>
                    </div>
              )}
            </Mutation>
        )
    }
}

export default CreateBook;