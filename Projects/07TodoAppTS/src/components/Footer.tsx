import { FilterValue } from "../const"
import { Filters } from "./Filter"

interface Props {
    activeCount:number
    completedCount: number
    filterSelected: FilterValue
    onClearCompleted: () => void
    handlerFilterChange: (filter:FilterValue) => void
}
export const Footer: React.FC<Props> = ({
    activeCount = 0, completedCount = 0, filterSelected, handlerFilterChange, onClearCompleted}) => {
    return (
        <footer className="footer">
            <span className="todo-count"> 
                <strong> {activeCount} </strong> tareas pendientes
            </span>
            <Filters filterSelected={filterSelected} onFilterChange={ handlerFilterChange }  />
            { completedCount >0 && 
            (<button className="clear-completed" onClick={onClearCompleted}> Borrar completadas</button>) }
        </footer>
    )
}