import './Cart.css'
import { useId } from "react";
import { CartIcon, ClearCartIcon } from "./Icons";
import { useCart } from '../hooks/useCart';

const CartItem = ({thumbnail, price, title, quantity, addToCart}) => {
    return (
        <li>
            <img src={thumbnail} alt={thumbnail} />
            <div>
                <strong>{title}</strong> - ${price}
            </div>
            <footer>
                <small>
                    Quantity: {quantity}
                </small>
                <button onClick={addToCart}  >+</button>
            </footer>
        </li>
    )
}

const Cart = () => {
    const cartCheckboxId = useId()
    const { cart, clearCart, addToCart } = useCart()
    return (
        <>
            <label className="cart-button" htmlFor={cartCheckboxId}>
                <CartIcon />
            </label>
            <input className='cart-button-Checkbox' id={cartCheckboxId} type="checkbox" style={{ visibility: 'hidden' }} />
            <aside className='cart'>
                <ul>
                    {cart.map( (aProduct) => { 
                        return (
                            <CartItem key={aProduct.id} {...aProduct} addToCart={ () => {return addToCart(aProduct)} }
                            />
                         )
                    } )}
                </ul>
                <button onClick={clearCart}>
                    <ClearCartIcon />
                </button>
            </aside>

        </>
    )
}

export {
    Cart
}