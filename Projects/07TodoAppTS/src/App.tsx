import { useState } from "react";
import { Todos } from "./components/Todos";
import "./todo.css"
import { TodoId, TodoTitle, Todo as TodoType } from "./types";
import { FilterValue, TODO_FILTERS } from "./const";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
const mockTodos = [
  {
    id: "1",
    title: "Acabar los tp1 y tp2",
    completed: false,
  },
  {
    id: "2",
    title: "Estar suscrito a los canales",
    completed: true,
  },
  {
    id: "3",
    title: "Salir al parque",
    completed: true,
  },
  {
    id: "4",
    title: "hacer un todo",
    completed: false,
  },
];

const App = (): JSX.Element => {
  const [todos, setTodos] = useState(mockTodos);
  const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.ALL) 

  const handleRemover = ({id}:TodoId) :void => {
    const newTodos = todos.filter( (unTodo) => {  return unTodo.id != id } )
    setTodos(newTodos)
  }
  const handleCompleted = ({id, completed} : Pick<TodoType, 'id' | 'completed'>  ) :void => {
    const newTodos = todos.map( (unTodo) => { 
      if(unTodo.id == id){
        return {
          ...unTodo, completed 
        }
      }
      return unTodo
    })
    setTodos(newTodos)
  }
  const handlerFilterChange = ( filter: FilterValue ): void => {
    console.log(filter)
    setFilterSelected(filter)
  }

  const activeCount = todos.filter( (todo) => { return !todo.completed}).length
  const completedCount = todos.length - activeCount

  const filteredTodos = todos.filter( (todo) => {
    if(filterSelected == TODO_FILTERS.ACTIVE) return !todo.completed
    if(filterSelected == TODO_FILTERS.COMPLETED) return todo.completed
    return todo
  } )

  const handleRemoveAllCompletes = () :void => {
    const newTodos = todos.filter( (todo) => {return !todo.completed} )
    setTodos(newTodos)
  }
  const handleAddTodo = ( {title}: TodoTitle ) => {
    const newTodo = {
      id: crypto.randomUUID(),
      title,
      completed:false
    }
    const newTodos = [...todos, newTodo]
    setTodos(newTodos)
  }

  return (
    <>
      <div className="todoapp">
        <Header onAddTodo={ handleAddTodo} />
        <Todos onRemoveTodo={handleRemover}
         onToggleCompleteTodo = { handleCompleted}
         todos={filteredTodos} />
         <Footer activeCount={activeCount} completedCount={completedCount}
                 onClearCompleted={ handleRemoveAllCompletes } filterSelected={filterSelected} 
                 handlerFilterChange={handlerFilterChange} />
      </div>
    </>
  );
};

export default App;
