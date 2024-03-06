import { Todo as TodoType, TodoId, type ListOfTodos } from "../types"
import { Todo } from "./Todo"

interface Props {
    todos: ListOfTodos
    onRemoveTodo: ({id}:TodoId) => void
    onToggleCompleteTodo: ({id, completed} : Pick<TodoType, 'id' | 'completed'>  ) => void
}

export const Todos: React.FC<Props> = ({todos, onRemoveTodo, onToggleCompleteTodo}) => {
    return (
    <ul className="todo-list" >
        {todos.map( (unTodo) => { 
            return (
            <li key={unTodo.id} className={`${unTodo.completed? 'completed' : ''}`  } >
                <Todo key={unTodo.id} id={unTodo.id} title={unTodo.title} completed={unTodo.completed}
                    onRemoveTodo={onRemoveTodo} onToggleCompleteTodo={onToggleCompleteTodo} />
            </li>)
        }) }
    </ul> )

}  

