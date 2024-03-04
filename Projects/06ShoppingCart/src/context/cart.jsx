
import { createContext, useReducer } from "react";
import { cartReducer, cartInitialState, CART_ACTION_TYPES } from "../reducers/cart.jsx";
// 1. crear contexto
const CartContext = createContext()

const useCartReducer = () => {
    const [state, dispatch] = useReducer(cartReducer, cartInitialState)
    const addToCart = (product) => {
        dispatch({type : CART_ACTION_TYPES.ADD_TO_CART, payload : product} )
    }
    
    const removeFromCart = (product) => {
        dispatch({type:CART_ACTION_TYPES.REMOVE_FROM_CART, payload: product} )
    }
    
    const clearCart = () => {
        dispatch({type:CART_ACTION_TYPES.CLEAR_CART})
    }
    return {state, addToCart, removeFromCart, clearCart}    
}


// 2.   Crear provider hacer un return o no no es tan importante aca en los dispatch. 
const CartProvider = ({children}) => {
    const {state, addToCart, removeFromCart, clearCart} = useCartReducer()

    return  (<CartContext.Provider value={{cart:state, addToCart, clearCart, removeFromCart}} >
        {children}
    </CartContext.Provider> )

}

export{
    CartContext, CartProvider, 
}