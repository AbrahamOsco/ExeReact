# React + Vite
1. Recordemos para obtener la plantilla inicial del project : npm create vite@latest
# Componentes
1. Componentes siempre hacerlos PascalCase para que react reconozca que son componentes, en un futuro pueden aparecer nuevas etiquetsa html y puede hacer conflictos con nuestras componentes por usamos PascalCase.
1. Todo jsx se transforma en js. 
1. En componente conviene usar className (ojo y no class conflicto con el class de js) y no id (por que queremos que sea reutilizable), para evitar usar directamente los elemento html y que no haya conflicto debemos usar un tipo de selector.
   1. Podemos usar css modules, tailwind, chakraui: catalogo de componentes.
   1. `https://unavatar.io/${userName}` Esto es un ejemplo de template strings, si lo usamos dentro de una etiqueta html debemo usar {} ojo.  
1. El margin botton depende mas de aplicacion que del componente twitterfollowcard en si. 
1. Cuando no le pasamos una propiedad y si lo printeamos/Accdemos a ella en el componente el valor es "undefined".
1. si ponemos directamente isFollowing como prop es equivalente a isFollowing={true}, para false hay  q hacerlo explicito. 
1. Podemos pasar en los props no solo strings sino tambien funciones esto es importante, porque asi les pasamos a los componentes hijos, actualizar un estado cambiar algo, hacer un fetch.
1. Tambien podemos pasar elementos (tipo un <span> </span> ) como props a un componente.
1. Un componente (factoria de elementos) es una funcion que al ejecutar devuelve elementos.
   elemento es lo que se renderiza, React renderiza el elemento
1. Las props son inmutables no hay que pisarlas.  
1. En las props podemos tener parametros por defecto usando: 
   const TwitterFollowCard = ( { children, unElement, formatUserName, userName='unknown', name, isFollowing}) => {...}
1. Podemos crear una constate y pasar todas las props de golpe. Esto es mala practica: 
   1. Estas embebiendo muchas veces informacion que no es necesaria. 
   1. puede hacer q el componente se renderize sin necesidad.
   ```
       const propsAbraham = { unElement:aElement, formatUserName:formatName,
            isFollowing:true, userName:"hola", name: "Abraham 123"}
    const propsOther = {unElement:aElement, formatUserName:formatName,
            isFollowing:true, userName:"crack", name: "Other User" }
                
    return (
        <section className="App"> 
            <TwitterFollowCard {...propsAbraham} >
                <h1>Usa tu poder sabiamente</h1>             
            </TwitterFollowCard>
            
            <TwitterFollowCard {...propsOther}>
                <h1> Un gran poder conlleva una gran responsabilidad</h1>
            </TwitterFollowCard>

        </section>           
    ```

### Children
1. Son como los hijos de un elemento, **basicamente es lo que envuelve un elemento** ej: 
   <button> Un texto del boton </button>
   el **Un texto del boton seria un children** 
1. Existe la prop especial children (que reciben los componentes) para acceder todo lo 
   que envolvio.
   Podriamos tener elementos (<h1> </h1>) o incluso otros componentes. 
1. Cuando usar children depende de como queres cambiar la interfaz del usuario, campo libre. 
1. nunca usar children como prop normal. 
1. Tenes un unico children y ahi adentro todos los elementos que quieras. 

### Hooks 
1. ¿Que me permiten hacer?:
   1. Añadir funcionalidad a los componentes de react. 
   1. Ejecutar bloques de codigo cuando ocurren ciertas cosas con tu componentes. 
   1. Funcionalidad para mejorar rendimiento del componente.  
1. Hook state:
   1. state = useState(valorPorDefecto) te escupe un array: 
      1. state[0] ->valor actual del estado
      1. state[1] -> funcion para setear el estado
   1. Estado separado de cada componente, estado interno a nivel de cada uno de los elementos que crea 
      el componente.
   1. Cada componente tiene su estado interno. 
   1. La magia de como funciona? de ahi viene el nombre de React (in spanish: reacionar), reactividad
      1. Cada vez que cambia de estado un componente, reacciona y refleja los cambios en la UI.
   #### DOOM VIRTUAL
      1. En lugar de volver a renderizar todo el article, react renderiza solo aquello que cambia de
         manera quirurjica.
      1. React: hace foto lo q renderiza y lo que quiero rendizar ahora halla las diferencia y renderiza unicamente las diferencias.
   
   1. Formas en que un componente se renderiza:
      1. Cada vez que cambia el estado interno de un componente, react entiende que tiene volver a
         renderizar el componente.
      1. Cuando un componente padre se renderiza prograga los cambios hacia abajo y por lo tanto tambien
      se van a renderizar sus hijos, independientemente si los props (de los hijos) hayan cambiado.
      1. En el caso de twitter cards aun q solo un componente "cambia" ambos componentes se renderizan. 
      1. Se ejecuta el codigo, pero como react se da cuenta que a va a renderizar lo mismo no cambia
          nada el DOM
   1. Para hacer comentarios en el return de un componente:  {/* Un comentario*/}
   1. El estado inicial solo se inicializa una vez, si vos usas una prop para inicializar un estado. se inicializa una vez y no se reinicializa cada vez que la prop cambie. 
   1. hacer un useState en el padre con false y luego pasarle el valor como prop al hijo y ahi adentro
      tiene otro useStae es mala practica. 
   1. Para devolver muchos componentes de golpes luego de hacer algun fetch a una API, podemos usar
      el map aplicamos una transformacion a cada elemento del vector y devolve un array de componentes
      luego react se encarga de fragmentar ese array y renderizar cada uno. 
   1. Cuando renderizamos una lista de elementos tenemos que indicar la key, (react debe saber q elemento refiere en el array necesita una identifiacion, sino puede haber problemas en el renderizado)
   1. Usamos como key algo que apriori sabemos que es un unico.
   1. 


