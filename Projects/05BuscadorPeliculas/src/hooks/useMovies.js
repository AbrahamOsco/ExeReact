import { useState, useRef, useMemo, useCallback } from 'react'
import { searchMovies } from '../services/movies'

const useMovie = ({search, sort}) => {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const previousSearch = useRef(search)
    console.log("entre al useMovie", previousSearch, search)
    const getMovies = useCallback(async ({search}) => {
        if (search == previousSearch.current) return
        try{
            setLoading(true)
            setError(null)
            previousSearch.current = search
            const newMovies = await searchMovies({search})
            setMovies(newMovies)
        } catch (e) {
            setError(e.message)
        } finally {
            setLoading(false)
        }
    }, [])

    const getSortedMovies = useMemo(() => {
        if(movies == undefined) return
        console.log('getSortedMovies', movies)
        const orderMovies = [...movies].sort( (a,b) => {return a.title.localeCompare(b.title)} )
        return sort ? orderMovies : movies
    },[movies, sort] )     
    return { movies: getSortedMovies, getMovies, loading} 

}

export{
    useMovie
}



