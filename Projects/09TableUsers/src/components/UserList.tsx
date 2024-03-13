import { SortBy, type User } from "../type.d"

interface Props{
    handlerChangeSort: (aSort:SortBy) => void
    deleteUsers: (aUuid:string) => void
    showColors: boolean
    users: User[]
}
export const UserList = ({ handlerChangeSort, deleteUsers, showColors, users} :Props) => { 
    return (
        <table style={{width: "100%" }} >
            <thead>
                <tr>
                    <th>Foto</th>
                    <th className="pointer" onClick={ () => { handlerChangeSort(SortBy.NAME) } } >Nombre</th>
                    <th className="pointer" onClick={ () => { handlerChangeSort(SortBy.LAST) } } >Apellido</th>
                    <th className="pointer" onClick={ () => { handlerChangeSort(SortBy.COUNTRY) } } >Pais</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody className={ showColors ? 'table--showColors' : 'table' }  >
                {
                    users?.map( (user) => {
                    return (
                    <tr key={user.login.uuid} >
                        <td> <img src={user.picture.thumbnail} alt={user.picture.thumbnail} /> </td>
                        <td> {user.name.first} </td>
                        <td> {user.name.last} </td>
                        <td> {user.location.country}  </td>
                        <td> <button onClick={ () => { deleteUsers(user.login.uuid)}} > Eliminar </button> </td> 
                    </tr>) } )
                }
            </tbody>
        </table>
    )
}