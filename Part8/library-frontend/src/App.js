import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import RecommendedBooks from './components/RecommendedBooks'

import { gql, useQuery, useMutation, useApolloClient, useSubscription } from '@apollo/client'

const BOOK_DETAILS = gql`
fragment BookDetails on Book {
  title
  published
  genres
  author {
    name
  }
}`

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
    genres
    author {
      name
    }
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
      published,
      genres,
      author {
        name
      }
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

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

const GET_USER = gql`{
  me {
    username
    favoriteGenre
  }
}`

const BOOK_ADDED = gql`
subscription {    
  bookAdded {...BookDetails }  
  }  
  ${BOOK_DETAILS}
`

const App = () => {
    const [page, setPage] = useState('authors')
    const [token, setToken] = useState(null)
    const authorsResult = useQuery(ALL_AUTHORS)
    const booksResult = useQuery(ALL_BOOKS)
    const userResult = useQuery(GET_USER)

    const handleError = (error) => {
        console.log('error: ', error);
    }

    const client = useApolloClient()

    const logout = () => {
        setToken(null)
        localStorage.clear()
        client.resetStore()
    }

    useSubscription(BOOK_ADDED, {
        onSubscriptionData: ({ subscriptionData }) => {
            const addedBook = subscriptionData.data.bookAdded
            window.alert(`${addedBook.title} added`)
            client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
                return {
                    allBooks: allBooks.concat(addedBook),
                }
            })
        }
    })

    const [addBook] = useMutation(CREATE_BOOK, {
        onError: handleError,
        refetchQueries: [{ query: ALL_BOOKS }]
    })

    const [editAuthor] = useMutation(EDIT_AUTHOR, {
        onError: handleError,
        refetchQueries: [{ query: ALL_AUTHORS }]
    })

    const [login] = useMutation(LOGIN, {
        onError: handleError
    })

    if (!authorsResult.data || !booksResult.data) {
        return <div>loading...</div>
    }

    if (!token) {
        return (
            <div>
                <div>
                    <button onClick={() => setPage('authors')}>authors</button>
                    <button onClick={() => setPage('books')}>books</button>
                    <button onClick={() => setPage('login')}>login</button>
                </div>
                <Authors
                    show={page === 'authors'} authors={authorsResult.data.allAuthors} editAuthor={editAuthor} loading={authorsResult.loading} token={token}
                />
                <Books
                    show={page === 'books'} books={booksResult.data.allBooks} loading={booksResult.loading}
                />
                <Login
                    show={page === 'login'} login={login} setToken={(token) => setToken(token)}
                />
            </div>
        )
    }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('recommendedBooks')}>recommended</button>
        <button onClick={() => setPage('add')}>add book</button>
          <button onClick={() => logout()}>logout</button>
      </div>

      <Authors show={page === 'authors'} authors={authorsResult.data.allAuthors} editAuthor={editAuthor} loading={authorsResult.loading}/>

      <Books show={page === 'books'} books={booksResult.data.allBooks} loading={booksResult.loading}/>

      <NewBook show={page === 'add'}  addBook={addBook}/>
        <RecommendedBooks
            show={page === 'recommendedBooks'} books={booksResult.data.allBooks} user={userResult.data.currentUser} loading={booksResult.loading}
        />
    </div>
  )
}

export default App
