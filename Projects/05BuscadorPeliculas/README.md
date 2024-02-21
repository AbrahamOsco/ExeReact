# 05 Buscado de peliculas 🎥 📹
### Consigna: Crea una aplicación para buscar películas
API a usar: - https://www.omdbapi.com/ 
Consigue la API Key en la propia página web registrando tu email.
https://www.omdbapi.com/?apikey=7dab499d&s=Avenger

API_KEY =  7dab499d

Requerimientos:
    ✅ Necesita mostrar un input para buscar la película y un botón para buscar.

    ✅ Lista las películas y muestra el título, año y poster.

    ✅ Que el formulario funcione

    ✅ Haz que las películas se muestren en un grid responsive.

    ✅ Hacer el fetching de datos a la API

Luego de terminar los requirimientos, primera iteración:

    ✅ Evitar que se haga la misma búsqueda dos veces seguidas.

    ✅ Haz que la búsqueda se haga automáticamente al escribir.

    ✅ Evita que se haga la búsqueda continuamente al escribir (debounce)
<hr>

#### Frameworks css que no usan clases (#class-less)
1. Te estila un poco tu pagina ejemplos waterCSS, boltCSS -> lo ponemos en el index.css
1. En los placeholder de los input colocar ejemplos directamente y en el label informa que cuerno poner.
1. No usar console.log para ver la forma del json.
1. Usar el indice esta mal (cuando hagamos el sort), lo mas correcto es usar como key la id. 
1. Si ves funciones como "RenderMovies"  "NoRenderMovies" -> Deberia ser un componente. 
    1. Es mas optimo hacer un componente porque si no creamos componentes estas funciones se vuelven a crear
        cada vez que app se vuelven a renderizar.
    1. Si el dia de mañana queremos usarlo fuera del componente lo podremos hacer. 
1. En un componente (Movies.jsx) si tenemos funciones como ListOfMovies NoMoviesResults que retornan elementos html. podemos usarlo en la funcion principal (same name componente)(Movies) asi: 
    ```
        const Movies = ({movies}) => {
            const hasMovies = (movies.length > 0)
            return ( hasMovies ? <ListOfMovies movies={movies}/> : <NoMoviesResults/>   )
        }
    ``` Donde ListOfMovies, NoMoviesResults son funciones definidas mas arriba.
1. En movies.jsx estamos usando el contrato de la API de (Movies) entonces nuestro componente esta acoplado
    de como funciona la api (Movies). Si el dia de la mañana cambia la API (movies) sera costoso cambiarlo.
    Por eso conviene pasarle "mapeos de la api" a los componentes. Si cambian de API solo lo cambiamos
    en un unico lugar.
    **Evitemos que un componente muy profundo use el contrato de la API 👉 Hacer el Mapeo de la API**
1. En los custom hooks es un posible lugar para hacer los mapeos y ya todos nuestros componentes recibiran.
    objetos ya mapeados.
1. Si en una funcion retornamos esto:     return { movies: mappedMovies} estamos retornando donde 
    la propiedad (clave) es 'movies' y el valor asociado es  mappedMovies. 
    1. Ahora al momento de invocar la funcion hay 2 formas: 
        1.   const {movies: mappedMovies} = useMovie() | De esta manera obtenemos una const mappedMovies donde 
        tiene el array de peliculas mapeadas.  (asignamos la propiedad 'movies' al cte mappedMovies)
        1. const mappedMovies = useMovies().movies | otra manera mas simple de hacer lo mismo.
## useRef:
1. Explicacion mala: Te permite crear una referencia a un elemento del DOM.
1. Explicacion good: Te permite crear una referencia mutable que persiste durante todo el ciclo de vida
     de tu componente, muy util para guardar cualquier valor como un identidifcador, elemento del DOOM, contador, y cada vez que cambia, NO! vuelve a renderizar el componente. Opuesto al useState.
     **Nos permite obtener un valor qe persista entre renderizados.**
1. const value = inputRef.current.value; console.log(value);
1. inputRef.current es equivalente al inputElement y para recuperar el valro del input accedemos a value.  
1. En los formularios conviene hacer un handlerSubmit y colcarlo en el form en lugar de hacer un handlerClick y
    ponerlo en el boton de tipo 'submit'. (Recuperamos toda la inforamcion y mucho mas con handlerSubmit.)
    1. <form className='form' onSubmit={handlerSubmit}>

#### Forma no controlada: (no lo controla react)
1. Acceder por el useReff tambien es no controlada. Forma mas sencilla y mas **optima**.
1. Lo que esta mal del useRef es abusar de ellos y poner useRef por cada input,
    si tenemos 15 input , uso 15 useRef? ->  NO!, hagamoslo de una forma nativa y rapida: 
    Con:
    1. <input name='query' ref={inputRef} placeholder="Avenger, Sherk 5, Saw 15" />
       <input name='edad' ref={inputRef} placeholder="Ingrese su edad " />
    1. const fields = Object.fromEntries(new window.FormData(event.target)).
    Nos genera un objeto cuya propiedad (clave) son los "name" (query y edad) de los inputs,etc y el valor contiene el dato ingresado.
    1. Puede verificar los datos tambien ttambien tenes muchos posibilidades.?
#### Forma controlada: (lo controla react) 
1. React controla q se escriben en los inputs como lo hace, cuando lo validamos 
1. Basicamente consiste crear un useState para cada input. y a cada input agregarle un onChange con el handler. 
    <input onChange={handleChange} name='query' ref={inputRef} placeholder="Avenger, Sherk 5, Saw 15" />
      const handleChange = (event) => { setQuery(event.target.value)}
1. **Desventaja** porque cada vez que cambia el input se va a renderizar la pagina MAS lento.
    (se evita con otro hook , pero lo ideal es evitarlo)  
1. **Ventaja**: Nos ayuda a simplificar la validacion de formularios.   
1. Dos formas de validar los datos: 
    1. usando un useEffect
    1. en el handleChange. (ojo puede quedar con el estado retrasado recuerda q es asincronica).
    entonces aca debemos hacer un const newQuery = event.target.value y compara con el ultimo valor y no 
    usar un query del useState. 👀
 1. Forma no controlada podemos hacer una validacion para evitar setear el estado.

1. Se recomienda hacerlo de la forma no controlada, mas facil optimo y aprendes mas JS.

1. Truco con el useEffect porque em esta haciendo la validacion directamente al pricipio:
    1. Se suele usar el useEffect para detectar si es el primer input del usuario. 
#### ¿Cuando hacer un custom hook?
1. Casi siempre que tenes un useEffect en tu componente se debe hacer un customHook. 
1. Hacer una grida:
 display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr) );
 Hacemos un grid y muestre la img si tiene un espacio disponible 200px o sino 1 fr.
 El div que contiene la grida debe estar con width: 100%. en .movies podemos aplicar un gap para separa. 
1. fr : fraccion y significa el espacio. si Tenes 100px y queres 1fr 1fr 1fr 1fr -> 1 fr = 25px.
1. gap: es la separacion entre elementos. 

1. Hacer movies?.map( (movie ) => {...}) primero el ? singifca que si movies es no es null ni undefined. 
    entonces se ejecutara el map, si movies es null o undefined la expresion se detiene y no produce ningun
    error.
1. ¿Que pasa si no funciona el FETCH 📫? 
    1. F12 en el navegador -> network (al lado del checkBox invert) en el dropdown [Request Type 🔻]
    1. ir a XHR/fetch, click en name, en header vemos la rspt y en response: el resultado. 
    1. Matas el 98% de problemas con fetch con los 2 trucos anteriores 
1. Fetching e datos no tiene sentido hacerlo dentro de un customHook. 
1. Finaly se ejecuta tanto como si pasaria por try como por catch.
1. Se podria hacer un let arriba de todo y  funcionaria tambien como un useRef, pero esa variable se comparta
 para todas las llamadas que se hacen a ese customHook useMovies. Igual esta mal no debe depender de eso. lo que nos piden.  
1. Es correcto usar el useRef para evitar hacer mas de 2 fetch de una misma busqueda seguida. 
1. Para compara usamos localCompare para que compare tambien teniendo en cuenta acentos. 

### UseMemo
1. Todo el cuerpo de la funcion es el render, las funciones que se crean dentro del cuerpo
    se van a recrear en cada render, y el metodo getSortedMovies() se ejecuta tambien en cada render. 
1. Sirve para memorizar calculos computacionales que queremos evitar q se hagan en cada render  y
   ejecutarlas solo cuando alguna dependencia  cambia (parecido al usse Effect pero este memoriza).
1. Ahora nuestro componente es mucho mas optimo, en lugar de hacer el sort en cada render lo hacemos
    cada vez q cambian nuestran dependencias.
1. Con esto ya no ordenamos por cada render que hacemos.
1. No tenes porque usarlo en todos los sitios, asegurate de solo usarlo cuando tenes un problema de
   rendimiento, (no te vuelva loco por un calculo de microsegundos, ojo ms si )
1. getMovies() -> esta funcion en el useMovies se destruye y se vuelve a crear -> no me crees? 
    hace un useEffect en app.jsx y observa.
1. Para salir del modo debugger recuerda eleminar stricMode en el main.jsx. 
1. El cuerpo del custom hook o del componente se vuelve a ejecutar cada vez que se rendriza. 
1. Si dentro de lo que queremos poner el useMemo hay ifs dependiendo del search, entonces 
    en la lista dependencia debe estar el search tambien.
1. Para evitar que se cree una misma funcion en cada render (ej en cada letra q ingresamo en el search), 
podemos -> dejamos la lista de dependnecias vacia [] y pasarle como argumento lo que antes tenia en la lista
    de dependencias.
1. Problemas de perfomance? -> Ver el profile herramienta de diseñador.  
1. UseEffect vs use Memo ? -> No tiene sentido:
    1. El useEffect es para ejecutar efectos, la primera vez que se renderiza un componente y
       cada vez que se renderiza el componente. 
    1. El useMemo es para para recalcular un valor cada vez que las dependencias cambien.  
### useCallBack
1. Te diste cuanto que usar el useMemo es un poco raro? crear una arrow funcion q retorna otro arrow function.
1. Existe el useCallBack para simplificar la sitnaxis, es lo mismo que el useMemo pero esta pensando para
    funciones, no hace falta que le pasemos un callback sino directamente la funcion q necesitamos.
1. useCallBack utiliza por debajo el useMemo. 
1. const getMovies = useMemo( () => {
        return async ({search}) => {...} }, [] ) 
1. const getMovies = useCallBack( async ({search}) => {...}, [])
1. useMemo vs useCallBack : useMemo para cuaquier cosa, (valor, funcion).  useCallBack lo usamos para 
    funciones
1. Si hicimos una funcion que recibe como argumento un objeto:
    const getMovies = ({search}) => {...}.
    Cuando invoquemos la funcion lo hacemos asi: 
    getMovies({search: newSearch}). Asi esta perfecto le pasamos un objeto con una propiedad search. 
    y el valor newSearch sera reemaplzado por cada search q tengemos en el getMovies. 
    si hago {search: 'holaMundo'} se ejecutara la funcion getMovies con el parametro 'holaMundo'.
1. Vemos que luego de hacer:     ✅ Haz que la búsqueda se haga automáticamente al escribir.
    1. Estamos haciendo un fetch cada vez que escribimos es un problema de rendimiento y ademas
    puede haber Race condition, donde nos peude mostrar el resultado de un fetch anterior que tardo mas 
    y no del ultimo fetch que hicimos. Error muy tipico.
### Debounce:
1. Que cuerno es un debounce? -> Que el usuario mientras escribi no vamos a hacer nada y vamos a esperar a 
que deje de escribir (300ms o 500ms) para que la ultima llamada del usuario sea la que realmente vamos a 
necesitar. 
1. Hacemos un timeout 500 ms si vuelve a llamar reincio el timeout. y vuelvo a esperar 500 ms. y asi. 
Si no me llama nadie timeout termino ejecuto la funcion, me llama otra vez reincio el timeout. 
1. Usamos el debounce de just angus-c.  https://github.com/angus-c/just?tab=readme-ov-file#just-debounce-it
1. Queremos hacer el dbounce del getMovies y no del hanlerChanges(). (sino el usuario no vera su input)
1. Hace solo la funcion debounceGetMovies no basta sigue mandado fetch por cada letra. este 
    debounceGetMovies se esta creando en cada render y por lo tanto no sirve. tenemos que 
    asegurar que sea un un unico debounce.   
1. 
 





