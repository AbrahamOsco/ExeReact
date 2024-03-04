import { useId } from "react"
import "./Filters.css"
import { useFilter } from "../hooks/useFilter"

const Filters = () => {
    const {filters, setFilters} = useFilter()
    const priceFiltersId = useId()
    const categoryFiltersId = useId()
    console.log("priceFiltersId, categoryFiltersId", priceFiltersId, categoryFiltersId)

    const handlerPriceChange = (event) => {
        setFilters( (prevState) => { return (
            {...prevState, minPrice : event.target.value }
        )} )
    }

    const handlerCategoryChange = (event) => {
        setFilters( (prevState) => { return (
            {...prevState, category: event.target.value }
        ) } )
    }


    return <section className="filters">
        <div>
            <label htmlFor={priceFiltersId}> Precio a partir de : </label>
            <input type="range" id={priceFiltersId} min= '0' max='1500' value={filters.minPrice} onChange={handlerPriceChange}/>
            <p> ${filters.minPrice} </p>
        </div>
        <div>
            <label htmlFor={categoryFiltersId}> Categoria: </label>
            <select id={categoryFiltersId} onChange={handlerCategoryChange}>
                <option value="all">Todas </option>
                <option value="laptops">Laptops </option>
                <option value="smartphones">Celulares </option>
                <option value="fragrances">Frangancias </option>
            </select>
        </div>
    </section>

}

export {
    Filters
}