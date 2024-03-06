import { FILTER_BUTTONS, FilterValue } from "../const"

interface Props{
    onFilterChange: (filter:FilterValue) => void
    filterSelected: FilterValue
}

export const Filters: React.FC<Props> = ({filterSelected, onFilterChange}) =>{
    return (
        <ul className="filters">
            { Object.entries(FILTER_BUTTONS).map( ([key, {href, literal}]) => {
                const isSelected = (key == filterSelected)
                const aClassName = isSelected ? 'selected' : ''
                return (
                    <li key={key}>
                        <a href={href} className={aClassName} onClick={ (event) => {
                            event.preventDefault()
                            onFilterChange(key as FilterValue)}  
                        }> {literal}  </a>                     
                    </li>
                )
            }  
            )}
        </ul>
    )

}
/*
<li>
                <a className={`${filterSelected == 'all'? 'selected' : ''}`}
                onClick={ ()=> {onFilterChange('all')} } >
                    Todos 🏟️
                </a>
            </li>
            <li>
                <a className={`${filterSelected == 'active'? 'selected' : ''}`}
                onClick={ ()=> {onFilterChange('active')} } >
                    Activos 📝
                </a>
            </li>
            <li>
                <a className={`${filterSelected == 'completed'? 'selected' : ''}`}
                onClick={ ()=> {onFilterChange('completed')} } >
                    Completados! ✅
                </a>
            </li>
*/








