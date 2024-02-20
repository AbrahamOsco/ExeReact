## API:
1. APIs:
1. Facts Random: https://catfact.ninja/fact
1. Imagen random: https://cataas.com/cat/says/hello
En Json: 
    1. https://cataas.com/cat/says/hello?fontSize=50&fontColor=red&json=true

### Tareas (tasks): 
1. Recupera un hecho aleatorio de gatos de la primera API
1. Recuperar la primera palabra del hecho
1. Muestra una imagen de un gato con la primera palabra.


### Prueba tecnicas, fetchs 📬
1. **CADA VEZ QUE CAMBIAS EL ESTADO SE VUELVE A RENDERIZAR** Cada set q obtengmaos con el useState usarlo
    con cuidado, al meterlo dentro de un useEffect ! ojo. 
1. No podemos hacer el fetch dentro del cuerpo de un componente, 
porque se ejecutaria cada vez que se renderiza el componente se cambia el estado hariamos un loop infinito.
1. usamos el Use effect con las dependencia vacia [] (se ejecuta solo una vez). 
1. Recordando cosas basicas de fetchs: 
    1. en el fetch data seria el json:
     { "fact": "The way you treat kittens in the early stages of it's life will render it's personality traits later in life.",
       "length": 109
    }
    1. y al hacer data.fact obtendriamos el valor asociado a la clave "fact".
1. Renderizado condicional: ejemplo un and entre una cte de state y un elemento ej <p> ej: 
    {fact && <p> {fact} </p> }
1. No se puede usar el async await en el useEffect. 
    La funcion que recibe **siempre debe ser una funcion sincrona**

1. Ojo si hacemos: 
    ```
    const [fact, setFact] = useState('')
    useEffect( () => {
        console.log("effect")
        fetch(CAT_ENDPOINT_RANDOM_FACT)
        .then( (res) => { return res.json() })
        .then( (data) => { return setFact(data.fact) } )
  },[])
    ``` 
    Como cambio el estado con setFact entonces se vuelve a renderizar el componente y vuelve a entrar al useEffect y vuelve a cambiar el estado y vuelve a renderizar y asi. infinitamente: (loop infinite ♾️) 
    **GET https://catfact.ninja/fact 429 (Too Many Requests)**
    1. Solucion ? -> Agregar un [] al useEffect como argumento.
1. Repaso funciones basicas:  
    1. const lista = ["che", "hola", "como andas"]
    1. const fact = "Edward Lear, author of"
    fact.split(' ') -> ["Edward", "Lear,", "author", "of]
    lista.slice(0,3) -> ["che", "hola"] , rango va [0,3)
    lista.join("@") -> "che@hola@como andas"
    fact.split(' ', 3) -> ["Edward", "lear,", "author"] . 2do parametro de split cantidad de elementos q quieres quedarte. 
1. Como gogolear para documentacion en desarollo web? 👉 **"mdn how to separated a string by token"**         
1. ¿Porque seria buena idea hacer esto: 
    1. setImgUrl(response._id) en lugar de hacer esto: setImgUrl(https://cataas.com/cat/says/${aIdImg})
    1. En el estado siempre tenemos que tener lo minimo necesario (es estatico). Y luego calculamos 
        lo que tenemos que hacer afuera.
1. Truco en css : Centrar div: 
    1.  display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    1. y que ademas hacer alig-item y justify-content es equivalnte a hacer un simple place-items:center
    1. Limitamos ancho de una imagen y por lo tanto para centrarlo aplicamso margin tambien los 2: 
        1.   max-width: 800px;
             margin: 0 auto; -> centra horizontalmente la imagne de su contenedor. 
    1. Ahora centrar texto y luego imagen. 
1. Es buena practica que los useEffect tenga una unica responsabilidad y no tener varias responsabilidad 
    porque son muy dificiles de debuggear. 
1. Siempre evitar la anidacion en los hooks, (que el codigo vaya de izq a derecha)
1. Como en la progrmacion basica primero happy path y luego manejo de errores. 
1. catch en el fetch entra si solo hubo un error en la peticion y no rspt. como lanzamos throw. si !res.ok. 
    1. Tendremos tanto si hubo error con la rspt como en la peticion. 
#### Separar logica (service)
1. El handler del button y el useEffect tiene codigo repetido creamos una funcion en el componente y luego
    lo usamos en ambos. 
1. separamos la logica en service (carpeta) pero no le pasamos el setState es algo **interno del componente**, queda adentro. NO PASEMOS setStates afuera del componente a otros modulos. 
1. El sgt codigo: 
      ```  useEffect( () => { 
        getFactRandom().then(setFact)
          }, [])
    ```
    1. Basicamente el getFactRandom() retorna una promesa y en el then podemos pasarle la funcion setFact() para q lo invoque con el resultado que retorno la promesa. esto es mala practica igual.
    1. Buena practica:
    ```  
        useEffect( () => { 
        getFactRandom().then((aNewFact) => {setFact(aNewFact) })
        }, [])
    ```
1. 

#### Custom Hooks
1. Sirve para reutilizar logica de los componentes.
1. Custom hook es reutilizar de los componentes en diferentes componentes.
1. Nuestro custom hook se convierte en una caja negra, que ya sabemos lo que retorna. 
1. Sigue las mismas reglas que los otros hook, no estar dentro de un if ni un while. 
1. Diferencia entre customHook y una funcion normal es que en la funcion no podemos llamar hooks.
    y en el custom hook podemos usar todos los hooks que queramos.
1. porque pasamos como argumento {fact} en lugar de fact? ->  {fact} es buena practica para que la funcion
   se puede extender facilmente (le podemos agregar mas parametros al objeto {} ).
    1. Son parametros nombrados:
        1. obligamos q el nombre sea fact
        1. obligamos que sea mas extensible.
1. Sirve para extraer justamente la logica y por eso los estados(useState) pasaran a estar a dentro de los      
    customHooks.
1. No usar useFetch() o useCatFetch() no mencionar la implementacion del customHook,
     porque como es una caja negra el customHook, puede cambiar de implementacion.
1. Siempre que podamos evitemos exportar la actualizacion del estado set state, mejor retorna una funcion 
    (sin parametros) que encapsule esa logica, y que usen eso.
1. Si ves un useEffect o un useState en un componente en react -> **preguntate si deberia ser un customHook.!**
1. UseEffect o useState tienen carga de logica que podemos reutilizar.  
1. En lugar de hacer mas feature hace el handling de errores y testing 
### Testing in playwright. 
1. instalamos:  npm init playwright@latest
1. playwright: Para pruebas de navegadores, tests.
1. nuestro proyecto usa import y en  playwright.config.js usa require para que funcione cambiamos la 
extension a cjs a este archivo playwright.config.js. Ahora si podemos usar el import en example.spec.js.
1. 

