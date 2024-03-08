# Users table.🦸👨‍🚀 👨‍💼
El objetivo de esta prueba técnica es crear una aplicación similar a la que se proporciona en este enlace: https://midu-react-11.surge.sh/. Para lograr esto, debe usar la API proporcionada por https://randomuser.me/.

Los pasos a seguir:

- [x] Fetch 100 rows of data using the API.
- [x] Display the data in a table format, similar to the example.
- [x] Provide the option to color rows as shown in the example.
- [x] Allow the data to be sorted by country as demonstrated in the example.
- [x] Enable the ability to delete a row as shown in the example.
- [x] Implement a feature that allows the user to restore the initial state, meaning that all deleted rows will be recovered.
- [x] Handle any potential errors that may occur.
- [x] Implement a feature that allows the user to filter the data by country.
- [x] Avoid sorting users again the data when the user is changing filter by country.
- [x] Sort by clicking on the column header.

1. Nunca tipar a mano googlear "generate typescript from json". y obtener la interface ingresando el json https://app.quicktype.io/ . pegarle todo el json siempre completo. 
1. UseState recuerda tiparlo:   const [users, setUsers] = useState<User[]>([])
1. table no estan deprecadas, nunca decir esas cosas la clave?   
  1. table, thead, tboby, tr (row),  td (cell)  
1. Al trabajar con typescript NO DEJAR ningun error de tipos. (es mejor any que error 😑).
1. Ante el error: **"react-dom_client.js?v=b30e49ed:519 Warning: Encountered two children with the same key, ``. Keys should be unique so"**
  1. NO desesperar basicamente te dice que las keys deben ser unicas y estas usando una key que no lo es, 
    podes probar usando el index si estba usando un "id" que resulto que no es unico.
1. Use effect dos maneras de uso: 
  1. podemos setear el estado usando algo como:     setShowColors(!showColors) siempre y cuando no necesitamos mas el viej estado.
  1. Si necesitamos tanto el estado viejo como el nuevo, el useState puede recibir un callback donde tiene 
  como argumento el estado viejo: 
    ```js  
      setSortByCountry( (statePrev) => { 
      const stateNew = !statePrev
      // trabajo aca con el viejo o el nuevo estado pim pum 📄
      return stateNew } )
    ```  
1. Ordenar strings como hacemos ? no debemos hacer algo asi : 
    ```const sortUser = users.sort( (a, b) => { return a.location.country > b.location.country ? 1: -1  }  ```
    porque no esta considerando caracteres no ASCII como è, à, ò y demas => usar el localCompare. 
 2. ```  const sortUser = users.sort( (a,b) => { return a.location.country.localeCompare(b.location.country) }) ``` 
 3. Si hacemos a y luego b lo hacemos de forma ascendente y alrevez de forma descendente. 
1. en el operador ? ya esta implicito el return: 
  ``` sortByCountry ? users.sort( (a,b) => {
     return a.location.country.localeCompare(b.location.country)
    }) : users
  ```  
1. Pero si lo probamos directamente asi no al hacer denuevo en no orenar no regresa al estado incial,
    porque modificamos la original, solucion => hacer una copiar de la original y devolver la copia ordenada.
  1. Solucion 1 (usando spread operator) para obtener una copia de user y ordenar esa: (nota: 7) 
    ```const sortedUser = sortByCountry ? [... users].sort( (a,b) => {...} ```
  2. Solucion 2 usando el structuredClone(): (copia profundo bajas la perfomance) (nota: 5)  
    ```const sortedUser = sortByCountry ? structuredClone(users).sort( (a,b) => {...} ```
  3. Solucion 3: usando ultima feature de js toSorted (Nota: 10)  
    ```const sortedUser = sortByCountry ? users.toSorted( (a,b) => {...} ```
  4. Vemos que al usar el ultimo feature nos tira warning de que toSorted no es propiedad de users. 
  5. se arregla declarando la firma del toSorted en type.d.ts.     
1. Un error seria tener otro estado para ordenar los users, mal solo se necesita un estado de users.
1. al usar el indice para borrar, aparecne usuarios que no deberian aparecer, se vuelve a reutilizar la misma
   key que tenia antes. 
1. Al borrar un usuario usando su indice y lo usamos como key, al modificar el array y los indices que tiene
  usarlo de key, si por ejemplo borramos el elemento con indice 2 el elemento con posicion:3 pasa a ser el 2
  y esto es un problema porque react cree que el 2 era el otro. -> usar una key unica corolario.
1. Si vas a sacar/agregar filas no tenes que usar el indice.
1. Hacer otro useState para backup los userOriginal es inncesario, otra es usar una variable global. let con 
   la lista orginal de usuario, podria funcionar porque se crea solo una unica vez el componente pero si se 
   crean muchos mas, el valor de esta variable se compartiria con todos los componentes no es la forma
   correcta.
  1. Estados estan pensandos para que cada vez que cambien se vuelva a renderizar la UI. 
  1. La forma correcta es hacer uso de useRef() -> para guardar un valor que se comparte entre renderizados
     y que al cambiar este valor, no se renderiza el componente. 
  1. Es como el useState pero con 2 diferencias:
     1. cada vez que cambia el ref no renderiza el componente
     2. Para acceder al valor de una referencia y cambiarla debemos acceder al .current. 
  2. Preserva el valor que lo guardamos entre renderizados, SE Puede guardar un elemento y no solo
     elementos del DOM. 
1. Primero filtramos usuarios y luego los ordenamos, no tiene sentido hacerlo al revez, porque
   no tiene sentido ordenar usuarios que no hemos filtrado.
1. Haciendo un refactor y Vemos que se esta renderizado el componente independiente si los resultados
   son exactamente los mismos o no, cambiar el color tambien ordenad denuevo y es ineficiente. 
1. Tenemos que hacer uso de useMemo para poder evitar esos ordenamiento inncesarios.
1. Con useMemo memorizar el valor y cuando se renderizar el componente al cambiar algun useState evitamos
   volver a crear funciones (y volver a ordenar como antes)
1. Al darle a colorear, cambia el estado y se renderiza todo el componente pero cuando llega a los useMemeo, se fija el array
   de depdendencia, como no cambio ningun, recupera el valor anterior me salto y doy el valor q tenia.
1. Haciendo con css truco pa pintar pares e impares (Css -> indices arrancan en 1 y no en 0 ): podemos hacerlo con odd y even tambien. 
    ```css
    .table--showColors tr:nth-child(2n)  {
      background-color: #432b6a;
    }

    .table--showColors tr:nth-child(2n+1)  {
      background-color: #7d65b6;
    }
    ```
1. En lugar de hace suceviso if, elif, podriamos hacer un record (Diccionario en typescript) una forma de tipar el objeto. 

