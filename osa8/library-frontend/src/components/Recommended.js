import { USER, ALL_BOOKS } from '../queries'
import { useQuery } from '@apollo/client'

const RecommendedPage = (props) => {
  const resultUser = useQuery(USER)
  let genre = ''
  if (!resultUser.loading) {
    genre = resultUser.data.me.favoriteGenre
  }

  let books = []
  const genreBooksResult = useQuery(ALL_BOOKS, { variables: { genre } })

  if (!genreBooksResult.loading) {
    books = genreBooksResult.data.allBooks
  }
  if (!props.show) {
    return null
  }
  return (
    <>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <b>{genre}</b>{' '}
      </p>
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
    </>
  )
}

export default RecommendedPage
