const ListOfMovies = ({movies}) => {
    return (<ul className="movies">
      {movies.map((movie) => {
        return (
          <li className="movie" key={movie.id}>
            <h3> {movie.title} </h3>
            <p> {movie.year} </p>
            <img src={movie.poster} alt={movie.title} />
          </li>)
      })
      }
    </ul>)
}

const NoMoviesResults = () => {
    return (<p> No se encontraron resultados para esa pelicula </p>)
}

const Movies = ({movies}) => {
    const hasMovies = (movies?.length > 0)
    return ( hasMovies ? <ListOfMovies movies={movies}/> : <NoMoviesResults/>   )
}



export {
    Movies
}