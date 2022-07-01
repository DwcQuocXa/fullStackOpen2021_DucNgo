import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

import { gql, useQuery, useMutation } from '@apollo/client'

const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
  }
}
`

const ALL_BOOKS = gql`
query {
  allBooks {
    title
    author
    published
  }
}
`

const CREATE_BOOK = gql`
  mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title,
      author
    }
  }
`

const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born)  {
      name
      born
    }
  }
`

const App = () => {
  const [page, setPage] = useState('authors')
    const authorsResult = useQuery(ALL_AUTHORS)
    const booksResult = useQuery(ALL_BOOKS)

    const handleError = (error) => {
        console.log('error: ', error);
    }

    const [addBook] = useMutation(CREATE_BOOK, {
        onError: handleError,
        refetchQueries: [{ query: ALL_BOOKS }]
    })

    const [editAuthor] = useMutation(EDIT_AUTHOR, {
        onError: handleError,
        refetchQueries: [{ query: ALL_AUTHORS }]
    })

    if (authorsResult.loading || booksResult.loading) {
        return <div>loading...</div>
    }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors show={page === 'authors'} authors={authorsResult.data.allAuthors}  editAuthor={editAuthor}/>

      <Books show={page === 'books'} books={booksResult.data.allBooks}/>

      <NewBook show={page === 'add'}  addBook={addBook}/>
    </div>
  )
}

export default App
