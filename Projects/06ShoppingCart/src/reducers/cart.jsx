const CART_ACTION_TYPES = {
    ADD_TO_CART: 'ADD_TO_CART',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
    CLEAR_CART: 'CLEAR_CART'
}

const cartInitialState = JSON.parse(window.localStorage.getItem('cart')) ||  []

const updateLocalStorage = (state) => {
    window.localStorage.setItem('cart', JSON.stringify(state))
}

const cartReducer = (state, action) => {
    const {type: actionType, payload: actionPayLoad } = action

    switch (actionType){
        case CART_ACTION_TYPES.ADD_TO_CART: {
            const {id} = actionPayLoad
            const productInCartIndex = state.findIndex( (item) => { return item.id == id })
            if (productInCartIndex >= 0){
                const newState = structuredClone(state)
                newState[productInCartIndex].quantity += 1
                updateLocalStorage(newState)
                return newState
            }
            
            // caso que el producto no estaba en el carrito 
            const newState =  [... state, { ...actionPayLoad, quantity : 1 }]
            updateLocalStorage(newState)
            return newState
            // Devolvemos el state actual  y agregamos el payload y a este ultimo le agregamos un campo con el valor 1. 
        } case CART_ACTION_TYPES.REMOVE_FROM_CART : {
            const {id} = actionPayLoad
            const newState =  state.filter( (item) => { return item.id != id } )
            updateLocalStorage(newState)
            return newState
        } case CART_ACTION_TYPES.CLEAR_CART: {
            updateLocalStorage([])
            return []
        }
    }
    return state;
}

export{
    cartReducer, cartInitialState, CART_ACTION_TYPES
}

