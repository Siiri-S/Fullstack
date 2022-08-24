import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import { useState } from 'react'

const Books = (props) => {
  const [genre, setGenre] = useState(null)
  const allBooksResult = useQuery(ALL_BOOKS)
  let allBooks = []
  let books = []
  let genres = []
  if (!allBooksResult.loading) {
    allBooks = allBooksResult.data.allBooks
    allBooks.forEach((book) => {
      genres = genres.concat(book.genres)
    })
    genres = [...new Set(genres)]
  }

  const genreBooksResult = useQuery(ALL_BOOKS, { variables: { genre } })
  if (!genreBooksResult.loading) {
    if (!genre) {
      books = allBooks
    } else {
      books = genreBooksResult.data.allBooks
    }
  }

  if (!props.show) {
    return null
  }
  console.log(books)
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
          {books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {genres.map((genre) => {
        return (
          <button key={genre} onClick={() => setGenre(genre)}>
            {genre}
          </button>
        )
      })}
      <button onClick={() => setGenre(null)}>all genres</button>
    </div>
  )
}

export default Books
