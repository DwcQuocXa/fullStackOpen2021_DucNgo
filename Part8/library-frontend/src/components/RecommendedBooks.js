const RecommendedBooks = (props) => {
    if (!props.show || !props.user) {
        return null
    }


    const {show, books, user, loading} = props

    if (loading) {
        return <div>loading...</div>
    }

    return (
        <div>
            <h2>recommendations</h2>
            <p>books in your favorite genre {user.favoriteGenre}</p>

            <table>
                <tbody>
                <tr>
                    <th></th>
                    <th>
                        author
                    </th>
                    <th>
                        published
                    </th>
                </tr>
                {books.filter(book => book.genres.includes(user.favoriteGenre)).map(a =>
                    <tr key={a.title}>
                        <td>{a.title}</td>
                        <td>{a.author.name}</td>
                        <td>{a.published}</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}

export default RecommendedBooks
