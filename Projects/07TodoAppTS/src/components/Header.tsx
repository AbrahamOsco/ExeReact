import { TodoTitle } from "../types"
import { CreateTodo } from "./CreateTodo"

interface Props {
    onAddTodo: ({title} : TodoTitle ) => void
}


export const Header: React.FC<Props> = ({onAddTodo}) => {
    return (<header className="header">
        <h1>Todo</h1>
        <img style={{width: '60px', height: 'auto' }}
        src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" alt="Typscript Logo" />
        <CreateTodo saveTodo={onAddTodo} />
     </header> )
}