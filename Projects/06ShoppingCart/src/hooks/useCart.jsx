import { useContext } from "react";
import { CartContext } from "../context/cart";


export const useCart = () => {
    const contextCart = useContext(CartContext)

    if (contextCart == undefined){
        console.log("useCart must be within a CartProvider print ")
        throw new Error('useCart must be within a CartProvider')
    }


    return contextCart
}

