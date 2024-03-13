import './App.css'
import { useState, useMemo } from 'react'
import {SortBy, type User} from "./type.d"
import { UserList } from './components/UserList'
import { useInfiniteQuery } from '@tanstack/react-query'

const getUsers = async ({pageParam = 1}: {pageParam: number} ) => {
  return await fetch(`https://randomuser.me/api/?&results=10&seed=darko&page=${pageParam}`)
  .then( async (res) => { 
    console.log( res.ok, res.status, res.statusText);
    if (!res.ok) throw new Error("Error en la peticion de get")
    return await res.json()}).then( (res) => {
      return  { users: res.results, 
                nextCursor: res.info.page +1 }
    })
}



function App() {

  const {isLoading, isError, data, refetch, fetchNextPage, hasNextPage } = useInfiniteQuery<{users: User[], nextCursor: number}>({
      queryKey: ['users'],
      queryFn: (nextCursor) => getUsers({pageParam:nextCursor.pageParam}),
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      initialPageParam: 1
    })

    console.log("data", data)
    console.log("data?.pages",data?.pages)

  const [showColors, setShowColors] = useState(false)
  const [sorting, setSorting ] = useState<SortBy>(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<string>('')
  const [currentPage, setCurrentPage] = useState(1)
  
  const users: User[] = data?.pages?.flatMap( (page) => page.users ) ?? []
  

  //const originalUsers = useRef<User[]>([])
  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const orderCountry = () => {
    const newSorting = (sorting == SortBy.NONE) ? SortBy.COUNTRY : SortBy.NONE 
    setSorting( newSorting )
  }
  
  const filtCountryUsers = useMemo( ()=> {
    console.log("Calculate filter users ")
    return (filterCountry.length >0)?
    users.filter( (user) => { 
      return user.location.country.toLowerCase().includes( filterCountry.toLowerCase()) 
  }) : users
  }, [users, filterCountry])

  const sortedUser = useMemo(() => {
    console.log("calculate sortedUsers")
    /* // que raro no funciona
    const compareProperties: Record <string, (user:User) => any>  = {
      [SortBy.COUNTRY]: (user) => {return user.location.country },
      [SortBy.NAME]: (user) => {return user.name.first },
      [SortBy.LAST]: (user) => {return user.name.last }
    } 
    return filtCountryUsers.toSorted( (a,b) => {
      const extractProperty = compareProperties[sorting]
      return extractProperty(a).localeCompare(extractProperty(b))
    });
    */

    if (sorting == SortBy.NONE) return filtCountryUsers
    else if ( sorting == SortBy.COUNTRY ){
      return filtCountryUsers.toSorted( (a,b) => {
        return a.location.country.localeCompare(b.location.country)
     })
    } else if ( sorting == SortBy.NAME ){
      return filtCountryUsers.toSorted( (a,b) => {
        return a.name.first.localeCompare(b.name.first)
     })
    } else if ( sorting == SortBy.LAST ){
      return filtCountryUsers.toSorted( (a,b) => {
        return a.name.last.localeCompare(b.name.last)
     })
    }

  }, [filtCountryUsers, sorting] )

  const handleDelete = (aUuid:string) => {
    //const filteredUsers = users.filter( (user) => {return user.login.uuid != aUuid } ) 
    //setUsers(filteredUsers)
  }

  const handlerResetChanges = async () => {
    await refetch()
  }

  const handlerChangeSort = (aSort:SortBy) => { 
    setSorting(aSort)
  }

  return (
    <div className="App">
      <h1>Prueba Tecnica 👨‍💻 🧪🤯 </h1>
      <header>
        <button onClick={toggleColors} > Cambiar color</button>
        <button onClick={orderCountry} > {sorting == SortBy.COUNTRY ? 'No Ordenar por pais' : 'OrdenarPorPais' }  </button>
        <button onClick={handlerResetChanges} > Resetear Cambios </button>
        <input placeholder='Filtrar por pais' onChange={
           (e) => { setFilterCountry(e.target.value) } } />
      </header>
      <main>
        {users.length >0 &&  <UserList handlerChangeSort={handlerChangeSort} deleteUsers={handleDelete}
          showColors={showColors} users={sortedUser} />} 
        {isLoading && <strong> Cargando! ⌚⌚⌚ </strong> }
        {!isLoading && isError && <strong> Ha ocurrido un error </strong>}
        {!isLoading && !isError && users.length == 0 && <strong> Todo 🆗 👌 No hay usuarios para mostrar <br/> <br/> </strong>   }
        {!isLoading && !isError && <button onClick={ 
          ()=> { void fetchNextPage() }} >  Cargar mas resultados </button> }
      </main>
    </div>
  )
}

export default App
