import React from 'react';
import './App.css';
import Books from './components/books';
import Addbook from './components/addBook';

import {ApolloProvider} from 'react-apollo';
import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
    uri: 'http://localhost:8000/graphql/'
});

function App() {
  return (
    <ApolloProvider client={client}>
        <Addbook />
        <Books />
    </ApolloProvider>
  );
}

export default App;
