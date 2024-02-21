import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'
import { Movies } from './components/Movies'
import { useMovie } from './hooks/useMovies'
import debounce from 'just-debounce-it'

const useSearch = () => {
  const [search, setSearch] = useState('')
  const [error, setError] = useState(null)
  const firstInput = useRef(true)

  useEffect( () => {
    if(firstInput.current){
      firstInput.current = (search == '')
      return
    } if (search == ''){
      setError('No se puede buscar una pelicula vacia')
      return
    } if (search.match(/^d+$/)){
      setError('No se puede buscar una pelicula con un numero')
      return
    } if (search.length < 3){
      setError('Busqueda debe tener almenos 3 caracteres')
      return
    }
    setError(null)
  }, [search])
  return {search, setSearch, error}
}



function App() {
  const [sort, setSort] = useState(false)
  const {search, setSearch, error} = useSearch()
  const {movies, getMovies, loading } = useMovie({search, sort})
  const inputRef = useRef('')
  console.log("render APP")
  const debounceGetMovies = useCallback(debounce( (search) => {
    console.log('Dentro del debounce 🤯', search)
    getMovies({search})
  }, 300), [])

  const handlerSubmit = (event) => {
    event.preventDefault()
    const fields = Object.fromEntries(new window.FormData(event.target))
    getMovies({search}) 
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    setSearch(newSearch)
    debounceGetMovies(newSearch)
  }
  const handlerSort = (event) => {
    setSort(!sort)
  }

  useEffect( ()=> {
    console.log('getMovies() creandose')
  }, [getMovies] )

   return (
    <div className='page'>
      <header>
        <h1>Buscador de peliculas</h1>
        <form className='form' onSubmit={handlerSubmit}>
          <label> Put your movie name: </label>
          <input onChange={handleChange} value={search} name='query' ref={inputRef} placeholder="Avenger, Sherk 5, Saw 15" />
          <input name='edad' ref={inputRef} placeholder="Ingrese su edad " />
          <div>
            <label> Ordenar por pelicula:</label>
            <input type="checkbox" name="" onChange={handlerSort} checked={sort} />
          </div>
          <button type='submit'> Buscar </button>
        </form>
        {error && <p style={{color:'red'}}> {error} </p>}
      </header>
      
      <main>
        { loading ? <p> Cargando ... </p> : <Movies movies={movies}/> }
      </main>
    </div>
  )
}

export default App
