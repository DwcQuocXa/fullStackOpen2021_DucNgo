import { useState } from 'react'

const Books = (props) => {
  const [filter, setFilter] = useState("all genres")
  const genres = ["refactoring", "agile", "patterns", "design", "crime", "classic", "all genres"]

  if (!props.show) {
    return null
  }

  const {show, books, loading} = props

  if (loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.filter(book => filter === "all genres" ? book : book.genres.includes(filter)).map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map(genre =>
          <button onClick={() => setFilter(genre)}>{genre}</button>
      )}
    </div>
  )
}

export default Books
