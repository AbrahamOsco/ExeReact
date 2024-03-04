import { createContext } from "react";
import { useState } from "react";

// Paso1: Creamos el contexto
// ademas este es el contexto que tenemos que consumir
const FiltersContext = createContext()

// Paso2: Creamos el provider, para proveer el contexto. 
// No deja de ser un componente de react lo que va envolver va a ser el children
// este es el que nos provee de acceso al contexto. 
const FiltersProvider = ({children}) => {
    const [filters, setFilters] = useState({ category: 'all', minPrice: 350 })

    return (
        <FiltersContext.Provider value={ {filters, setFilters} } >
            {children}
        </FiltersContext.Provider>
    )
}


export{ 
    FiltersContext, FiltersProvider
}