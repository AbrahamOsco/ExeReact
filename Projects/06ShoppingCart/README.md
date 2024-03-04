# Shopping cart 🛒
## Enunciado 3era prueba tecnica de react 
Ecommerce

- [✅] Muestra una lista de productos que vienen de un JSON
- [✅] Añade un filtro por categoría
- [✅] Añade un filtro por precio

Haz uso de useContext para evitar pasar props innecesarias.
Carrito:

- [✅] Haz que se puedan añadir los productos a un carrito.
- [✅] Haz que se puedan eliminar los productos del carrito.
- [✅] Haz que se puedan modificar la cantidad de productos del carrito.
- [✅] Sincroniza los cambios del carrito con la lista de productos.
- [✅] Guarda en un localStorage el carrito para que se recupere al recargar la página. (da puntos)

1. Recordemos para iniciar un proyecto npm create vite@latest
1. No olvidar hacer el export al final luego de crear un componente. 
1. Luego el products que viene del json tiene un cuerpo del esitlo : '{
    "products":[
       {... }],... } '
    Solo nos basta hacer un import {products} from "./mocks/products.json" para obtener el array de productos
1. Para filtrar podemos tener un estado para cada filtro. En este caso vamos a tener un estado general para cada filtro.
1. con:
    ```
    <label htmlFor="price"> Price: </label>
    <input type="range" id="price" min= '0' max='1000'  />
    ```
    Cuando haga click en en el label hara focus en el input para ingresar el dato. asi asociamos label con input en react.
1. Hacemos el filtro de precio por rangos. 
1. con esto: .filters > div aplicamos estilos a cada div dentro del objeto  
    cuyo className sea filters.
1. Ponerlo al final(o arriba/abajo) porque si lo ponemos antes va a dar unos brincos (porque los mismos digitos va ocupando lugar de 0 a 1000 ).
1. Cuanod un componente en su return "invoca" otros componentes entonces diremos que tiene "un hijo". Por lo tanto el app 👨 tiene hijos que son el : "Header" 🧒 y "Products" 🧒 . 
El header tiene un hijo que es el Filters. Ademas en app tenemos el estado y el calculo de los 
productos filtrados, pero en filter queremos actualizar el estado de los filtros.
Por lo tanto tenemos que pasar el setState de la App al Header y del Header a Filters esto se le conoce como **Prop Drilling**.
Taladro para pasar hacia abajo unas props para que pueda funcionar. 
    App
    🔽          🔽
    Header      Products
    🔽
    Filters
    🔽
1. UseMemo solo usar cuando hay problemas de rendimiento, no usar por defecto useMemo useCallback,  porque el costo de usar useMemo puede ser mayor que su beneficio. Si el filtrado es 25 elem no hay problema, si hay 1k lo pensamos.
1. Que es lo mas dificil de react? -> Usar bien react. 
1. Estamos haciendo algo mas en los handlers que creamos en Filters.jsx 
    1. Estamos pasando la funcion nativa de actualizar de react a un componente hijo.
    1. Exponemos el estado el contraro q espera es el state y no deberia porque saberlo, debemos crear una abstraccion aca, deberia saber unicamente algo mas concreto, 
    1. Lo malo de hacer esto es que luego ante un cambio el contrato lo tenes que cambiar en
     muchos sitios.
1. Una forma de evitar el prop Drilling es usando children. entre App y Header:
    <Header> <Filters filterOnChange ={setFilters}> </Filters>  </Header>
1. Estamos componinedo nuestro ui a base de usar la prop children. el hader recibe como prop el children y lo renderiza dentro.
1. Con lo de arriba el app tiene como hijo directamente el Filters, el app manda directamente a filter el setFilters.
1.  No hay uno mejor, no siempre es posible usar children. 
1. Como arrelgamos esto?? 
    1. Use context:  
    1. Use reduce: manejar un estado de forma diferente al useState
1. Recordar extraer la logica de los hooks en un customHook, con el objeto de que estos acutenn como una cajan negra. 
    Customhook unica funcion podemos podemos usar todos los hooks que querramos ahi dentro la funcion comienza con use... .

## useId
1. Use id: bastante nuevo, para evitar id='price'.
    1. el id tiene que ser un identificador unico en toda tu aplicacion, ademas funciona con 'server-sunderring'.  
    1. Para identificarlo usa la posicion y el orden con el que se estan llamando las cosas. Chequear (F12) ->Components. Identiico al componenete y le pono una letra y luego me guardo el orden en que se esta llamando. (Es universal para servidor-cliente) sera el mismo. 
    1. No sirve para usarlo key en algo que se esta iterando, estas creando un nuevo id o te referis, para el .map() usar un identificador unico para ese elemento. 

## useContext
1. Arreglaremos el **prop drilling** porque el tema de filtro quizas queremos ver en un footer 
    ver que filtros tenemos activos.
1. Hacer un footer y que muestre el estado de los filtros es bastante bueno, tenemos un debugger online en un componenente, asi 
    visualizamos el estado de nuestro Footer. 
1. useContext Lo usamos para evitar el prop Drilling.
1. useContext es "algo" (entorno) totalmente separado (desacoplado) de nuestro arbol de componentes: 
    1. Logramos desacoplar toda la logica de los filtros, y ademas cualuier componente puede leerlo directamente, sin necesidad 
    de que se lo pasemos.
1. La gran pregunta es que ahora como sabe el filter leer de useContext?. Ahora necesitamos englobar toda nuestra aplicacion con algo
    llamado filter.Context.Provider. Entonces tenemos 3 pasos: 
    1. Crear el contexto
    2. Proveer el contexto: (Va a envolver nuestra aplicacion) decir q parte de la aplicacion puede acceder al contexto
    3. Consumir el contexto:
1. El provider lo que va a tener en el contexto sera informacion que vamos a querer acceder no hace falta que sea 
   un useState puede ser un numero, en este caso va a ser un objeto y luego un estado.
1. El provider envuelve (lo q va dentro del elemento (etiqueta) ) lo que le pasamos como children.
1. En este caso envolvemos toda la aplicacion, y no solo los hijos de app y sus siguientes, la app se quejara porque tambien se necesita acceder al contexto para funcionar.  
1. Ahora proveemos nuestro contexto en el punto de entrada (main.jsx), sacamos React.StricMode y ponemos el FiltersProvider 
1. Creamos contexto: 
    import { createContext } from "react";
    export const FiltersContext = createContext()
1. Proveemos contexto: 
```  
const FiltersProvider = ({children}) => {
    return (
        <FiltersContext.Provider value={ { category: 'laptops', minPrice: 0 } } >
            {children}
        </FiltersContext.Provider>
    )
}
``` 
Ademas no olvidar de cambiar el pto de netrada en el main.jsx. 
1. Consumimos el contexto: con useContext.
1. Un contexto estatico (uno q se cambia a mano) no esta mal, puede ser para los colroes de la plantilla, para inyectar configraucion,
    tengo contexto siempre es para hacer estado global . ? -> NO.
1. Podes tener un contexto para los colors de las plantilla, puede ser estatico tambien no solo se pueden hacer estados globales.   
1. Contexto es una forma de inyeccion de dependencia. (inyectar informacion saltandote las prop de las componentes)
1. Creamos un State en el contexto para asi controlarlo desde el mismo contexto los filters, asi tenemos un solo estado para este contexto y su estado se compartira asi modelaremos un estado global. 
1. En que caso convien usar context y en que casos redux ? 
    1. Muchos cambios frecuentes y son mas complicas usamos redux o alternativas.
1. UseContext como estado global esta pensando para estados que cambian con poca frecuencia o que sean pequeños. 
1. Si queres cambios quirurgicos, cambios mas graves o complejos => puedes usar redux (pero es peor opcion hoy en dia NUNCA USARLO), 
    1. Evitar redux hay muchas mejoras opciones zustand
1. Esta muy bien crear un custom hook useFilter, podemos usar cualquier cosa utilizar redux o zustand en el useFilter y es invisible.
    1. const {setFilters} = useFilter() -> Siempre que obtengamos el setFilters no cambiara (siempre q respetemos el contrato).
1. Ademas hemos eliminado el pasaje de props desde app hasta filter (prop drilling).
1. Cuando creamos un contexto provider este ((( debe tener un valor (**value** ej :"FiltersContext.Provider value={ {filters, setFilters} }" ) porque en el useFilter cuando usamos useContext() queremos q nos retorne
lo que ha leido.  ))) 
1. Al usar FIlterProvider envolver las partes del arbol del componente donde lo vamos a necesitar. 
1. No podemos colocar el FIlterProvider dentro de App (en el return de APp) porque app lo necesita antes del return (invoca usaFilter)
y este ya hace un useContext y necesita ademas los datos que guarda. 

### Dos fuentes de la verdad   
1. Error muy frencuente que mucha gente comete. 
1. El priceValue que tenemos en Filter.jsx es un estado local y tenemos el estado global de Filters con minPrice.
1. **MALA PRACTICA** Que te dar 1k dolores en la cabeza. Tenes 2 fuentes de la verdad un amigo te dice q tu novia fue infiel y el otro dice que no. a quien crees? esto mismo pasa en react. 
1. En el contexto exportar tanto FiltersContext (para crear el contexto posiblemtne en un hook para encapsular la logica), 
    Tambien exportamos el FiltersProvider para poder envolver en el punto de entrada todo la App.jsx.
1. Debemos Usar un customHook en varios componentes ?:
    1. Claro, esta pefecto estamos reutilizando la logica en muchos componentes esta perfecto
1. en cada archivo q tengamos en context aplica un singleton. 
1. Hacemos que el carrito no se vea por defecto  
1. cart-button ~ input:checked ~ .cart esto es el selector hermano. El ~ es el selector hermano. 
1. Buscamos al hermano que esta chequeado y al hermano 

### Seguimos:
1. Recordemos que el el setState() retorna el nuevo estado en que se encuentra.
1. aca:         setCart( prevState => { return (
            [...prevState, { ...product, quantity:1 }]
        )})
    Armamos un nuevo array con el estado anterior y agregamos el producto con todos los datos anteriores pero agregamos un campo quantity 1.
1. Al usar los provides tratar de usarlo con el scope mas pequeño y no envolver en toda la applicacion. (mas pequeño el scope mejor)
1. Si el contextCart es undefine en el customHook o en otra parte es porque estamos usando este customHook en un sitio que no puedes.
1. ``` 
    const checkProductInCart = (product) => {
        return cart.some( (item) => {return item.id == product.id} ) 
    }
    ``` 
    Con esto chequeamos si el producto actual esta en el carrito. 
1.  Usamos el structuredClone para hacer una copia profunda de los arrays y de los objetos. spaceOperator hace una copia superficial
1. Una vez que creamos el contexto tenemos que crear el custom hook para leer el contexto. 
1. BUENA PRACTICA: es que en el custoHooks que consumen un contexto debemos revisar si el contexto que han leido es undefined o no, 
    si es undefined nos dice que estamos usando este customHook en un lugar donde no debo, porque esa parte de la apicacion no 
    esta envuenta con un provider. 
1. Usar los providers solo en aquellos lugares que tiene sentido mas pequeño el scope mejor.
### Repaso necesito pasarle al handler onCLick del boton una funcion que recibe un argumento como hago ? 😸❓
1. Tenemos la funcion :
    const addToCart = (product) => { // hago muchas cosas aca. }
1. Luego queremos invocar esta funcion como un handler de un boton  y pasarle el producto  ¿como hago?: 
     <button onClick={ () => {return addToCart(aProduct) } }>
        {isProductInCart? <RemoveFromCartIcon/> : <AddToCartIcon/> }                                                            
    </button>
1. Listo

### Continuando: 
1. **Renderizados condicionales:**  
Ejemplo: 1. <button onClick={ () => { 
            isProductInCart ? removeFromCart(aProduct) : addToCart(aProduct)  
        } }> <button>
        2. < button style= {{ backgroundColor: isProductInCart? 'red': 'green'} } 
1. Una de forma de actualizar el estado es usando prevState: 
     setCart( (prevState) => { 
        return prevState.filter( (item) => {return item.id != product.id} )
    })
    Otra manera setCart( filter( (item) => {return item.id != product.id} ) )
    Esto aveces puede tener una raice condition y no accede al ultimo valor del estado. 
    BUena practica  hacer el setCart (setState) con el argumento (Que es el valor anterior del estado).
      
1. Puedes empezar con useContext y luego pasar a un estado global con redux o con suztand. 
1. Si fuera un liveconding esta prueba de react seria para un mid-senior. 🤯
1. Hacerlo de estas dos maneras son equivalentes 🤯 esto: 
        <CartItem key={aProduct.id} thumbnail={aProduct.thumbnail} price={aProduct.price}
                    title={aProduct.title} quantity={aProduct.quantity} addToCart={ () => addToCart(aProduct) }
                    /> )})}
1.  <CartItem key={aProduct.id} {...aProduct} addToCart={ () => addToCart(aProduct) } />)} )}
1. No hacer bind. 
### Use Reducer: 
1. En primer lugar observamos que dentro de nuestro context cart hay muchos setState dentro de nuestra funcion CartProvider y 
    ademas son complicados ❌ ❌. Esta todo mezclado el return de lo que renderiza con la actualizacion del estado. 
1. Esta perfecto mezclar useContext con useReducer (masomenos obtenemos algo parecido a useRedux).
1. Es un hook que nos permite manejar el estado de una manera escalable, que se basa en que recibe: 
    1. **state** EL estado Actual!!!.
    1. **action** La accion que tiene que hacer, apartir dle estado actual
1. Finalmente la accion te retorna un nuevo estado. Totalmente separado (desacoplado)  del componente del provider. 
**Basicamente obtenemos un nuevo estado apartir del estado actual y una accion** 
1. El estado inicial podria un numero , podria ser un array, un objeto o lo que sea.
1. useReducer siempre retorna un estado si es nuevo o viejo, eso depender de la accion que tenemos. 
1. 
1.  Siempre dentro de los case buscamos de state ahora y no de "cart" como antes en (cart.jsx);
1.  const {type: actionType, payload: actionPayLoad } = action
    1. En actionType: le pasaremos el string de la accion para identificar cual hacemos.
    1. payload: le pasamos todo el objeto que neceistamos para actualizar el estado. 
1. en lugar de hacer un **return setCart()** dentro del reducer lo que tenemos que hacer es devolver el nuevo estado.
1.  
1. En el reduce en lugar de llamar un 
1.             // Devovlemos el state actual  y agregamos el payload y a este ultimo le agregamos un campo con el valor 1. 
            return [... state, { ...actionPayLoad, quantity : 1 } ]
``` 
// En lugar de hacer esto: 
const CartProvider = ({children}) => {
    const [cart, setCart] = useState([])
    const addToCart = (product) => { 
        const productInCartIndex = cart.findIndex( (item) => {return item.id == product.id} )

        if (productInCartIndex >= 0){
            const newCart = structuredClone(cart)
            newCart[productInCartIndex].quantity += 1
            return setCart(newCart)
        }
        // producto no esta en el carrito asi que lo agregams con cantidad 1. 
        setCart( (prevState) => { return (
            [...prevState, { ...product, quantity:1 }]
        )})
    }

    const clearCart = () => {
        setCart([])
    }

    const removeFromCart = (product) => {
        setCart( (prevState) => { 
            return prevState.filter( (item) => {return item.id != product.id} )
        })
    }
``` 
1. Hacemos esto: 
```
const reducer = (state, action) => {
    const {type: actionType, payload: actionPayLoad } = action
    const {id} = actionPayLoad    
    switch (actionType){
        case 'ADD_TO_CART': {
            const productInCartIndex = state.findIndex( (item) => { return item.id = id })
            if (productInCartIndex >= 0){
                const newState = structuredClone(state)
                newState[productInCartIndex].quantity += 1
                return newState
            }
            // caso que el producto no estaba en el carrito 
            return [... state, { ...actionPayLoad, quantity : 1 }]
            // Devolvemos el state actual  y agregamos el payload y a este ultimo le agregamos un campo con el valor 1. 
        } case 'REMOVE_FROM_CART' : {
            return state.filter( (item) => { return item.id != id } )
        } case 'CLEAR_CART': {
            return initialState
        }
    }
    return state;
}
```
1. Ahora una vez terminado el cartReducer en el provider hacemos: 
1. usamos el useReducer(funcionReducer, estadoInitial), recibe la funcion reducer que creamos y el estado inicial. 
1. const [state, dispatch] = useReducer(cartReducer, initialState) Donde aca el useReducir nos va a delvolver un array
de 2 elementos en el primer parametro tenemos el estado y segundo el dispatch, el dispatch se encarga de enviar las acciones
    al reducer. 
1. ¿ Vale la pena usar useReducer? 
    1. Ahora extraimos la logica para actualizar el estado en una funcion totalmente separada, esto lo podemos usar incluso afuera de react.
    1. Tenemos la logica de actualizacion del estado en el useReducer, lo podemos usar incluso afuera del react. (svelt).
    1. Para testear la logica  (caso de logica este dentro del componente), tenemos que renderizar el componente.
    1. Si tnemos la logica afuera (en el reducer) , solo llamamos a la funcion reducer y listo lo podemos testear. 
    1. Hacemos test en segundos una locura 🤯
    1. expect( cartReducer([], {type: 'ADD_TO_CART', payload: { id: 1 } } ) ).toEqual( [{ id: 1, quantity:1 } ] )  
1. Usamos useReducer, cuando tenemos muchos useStates uno detras de otro, esto quiere decir que tu estado esta fragmentando
    cuando en una accion quieres actualizar parte de ese estado. 
    1. En lugar de hacerlo con un estado fragmentad y actualizar manualmente, podemos tener un reducer que la accion sea Usuario_Escribe. 
    1. 
1. Podemos reducir aun mas la dependencia de usar React Context.
1.  
