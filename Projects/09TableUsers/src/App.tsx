import './App.css'
import { useState, useEffect, useRef, useMemo } from 'react'
import {SortBy, type User} from "./type.d"
import { UserList } from './components/UserList'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sorting, setSorting ] = useState<SortBy>(SortBy.NONE)
  const originalUsers = useRef<User[]>([])
  const [filterCountry, setFilterCountry] = useState<string>('')

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
    const filteredUsers = users.filter( (user) => {return user.login.uuid != aUuid } ) 
    setUsers(filteredUsers)
  }

  const handlerResetChanges = () => {
    setUsers(originalUsers.current)
  }

  const handlerChangeSort = (aSort:SortBy) => { 
    setSorting(aSort)
  }


  useEffect( ()=>{
    fetch('https://randomuser.me/api/?&results=100')
    .then( async (res) => { return  await res.json() })
    .then( (res) => { setUsers(res.results); 
      originalUsers.current = res.results; } )
    .catch( (error) => { console.log(error)})
  }, [])

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
      <UserList handlerChangeSort={handlerChangeSort} deleteUsers={handleDelete} showColors={showColors} users={sortedUser} />
    </div>
  )
}

export default App
