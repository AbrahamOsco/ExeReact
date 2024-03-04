import { useState } from "react";
import { AddToCartIcon, RemoveFromCartIcon } from "./Icons";
import "./Products.css"
import { useCart } from "../hooks/useCart";

const Products = ( {products}) => {
    const {cart, addToCart, removeFromCart} = useCart()

    // 
    const checkProductInCart = (product) => {
        return cart.some( (item) => {return item.id == product.id} ) 
    }

    return <main className="products">
        <ul>
            { products.slice(0,15).map( (aProduct) => {
                const isProductInCart = checkProductInCart(aProduct)
                return (
                    <li key={aProduct.id}>
                        <img src={aProduct.thumbnail} alt={aProduct.title}/>
                        <div>
                            <strong>{aProduct.title} </strong> : ${aProduct.price}
                        </div>
                        <div>
                            < button style= {{ backgroundColor: isProductInCart? 'red': 'green'} }
                             onClick={ () => { 
                                isProductInCart ? removeFromCart(aProduct) : addToCart(aProduct)  
                            } }>
                                {isProductInCart? <RemoveFromCartIcon/> : <AddToCartIcon/> }                                                            
                            </button>
                        </div>
                    </li>
                )
            }  )}
        </ul>
    </main>

}

export {
    Products
}
