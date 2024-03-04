import { useFilter } from "../hooks/useFilter"
import { useCart } from "../hooks/useCart"
import "./Footer.css"


const Footer = () => {
    const {filters} =  useFilter()
    const {cart} = useCart() // destructuramos aun q solo use cart devolvemos contextCart este es {cart, addToCart, clearCart}. 
    return (
        <footer className="footer">
            {JSON.stringify(filters, null, 2)}
            {JSON.stringify(cart, null, 2 )}
            <h4>Prueba tecnica de React 3 🤯 ☢️ 
                <span>@CD123</span>
            </h4>
        </footer>
    )
}

export{
    Footer
}