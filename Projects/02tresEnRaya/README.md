# Juego Hachas o maderas (tres en raya) 🤯 🪓 🪵
1. Si nos pasan una funcion como prop al componente y este debe tener parametros. Podemos crear una funcion
    aux en el mismo componente donde invoquemos la funcion que nos pasan y ahi meterle los parametros.
    const Square = ( {children, isSelect, updateBoard, index} ) => {
    const handlerClick = () => {
      updateBoard(index)
    ...
    }}
  ej: updateBoard(index) si o si recibe el index entonces lo encapsulo en handlerCLick. 
1. grid-template-columns: repeat(3, 1fr);  3 columnas por fraccion.
1. En javascript:
  const [board, setBoard] = useState(Array(9).fill(null))
  const newBoard = [...board]
  newBoard[index] = turn
  setBoard(newBoard)
  Usar const es prohibir la reasignacion pero eso no impide que podamos cambiar los valores
  a los elementos en el caso de que newBoard sea un array o un objeto. **se puede cambiar**
1. No hacemos directamente: 
    board[index] = turn
    setBoard(board).
    ESTO ESTA MAL ❌ No tenemo que modificar nunca las props de las componentes ni los estados
    que tenemos en el useState.
    Estamos modificando el estado actual sin llamar a setBoard() ❌. 

    Siempre debemos crear un nuevo array con el valor en este caso. (lo hacemos con el spread)
1. con el spread operator '...' realizamos una copia superficial.
1. con structuredClone(board) podemos hacer un deep copy. 
1. Para los useState lo podemos asociar a unos enums (pseudoEnum).
1. Hay 3 tipos de fors en javascript:
    1. for (let i = 0; i < cars.length; i++) {
            text += cars[i] + "<br>";
        }
    1. for in se usa para iterar sobre las propiedad de un objeto.
        const person = {fname:"John", lname:"Doe", age:25};
        let text = "";
        for (let x in person) {
            text += person[x];  
        } // John Doe 25
        tambien podemos iterar los elementos un array: 
        const numbers = [45, 4, 9, 16, 25];
        let txt = "";
        for (let x in numbers) {
            txt += numbers[x];
        }// 45 4 9 16 25
    1. for of se usa para iterar todos los valores sobre un objeto iterable. jaja
        const cars = ["BMW", "Volvo", "Mini"];
        let text = "";
        for (let x of cars) {
            text += x;
        }
1. Actualizacion de los estados en react es asincrono. 
1. Si usariamos board en checkWinner alguien podria pensar que ya tiene el estado nuevo pero no es asi. 
1. Dentro del useState podemos crear un arrow function con esta jugada podemos tener acceso al estado
   anterior y al nuevo:
    if (newWinner == 'W'){
      setWinner( (previewState) => {
        console.log(`Estado Actual ${newWinner} y el anterior era ${previewState}`)
        return newWinner
      })
    } 
1. No podes hacer un async await porque esto no devuelve una promesa. 
1. aBoard.every( (square) => { return square != null } ) Funcion anomima para poder ver de golpe si 
   todos los square son distintos de null.
1. Para agregar confeti al celebrar add a dependecy:
    npm install canvas-confetti -E.
### Local storage:
1. En local storage **es una base de datos EN MEMORIA CLAVE-VALOR!** guardamos un par clave-valor (ambos son strings) haciendo:
    ```window.localStorage.setItem('board', JSON.stringify(newBoard))```
1. El use stage, todos los hooks nunca pueden estar dentro de un if, ni un while,ni un for.
    (porque React guarda las posiciones de los hooks en un array interno en memoria)
1. *** Los hooks siempren Tienen que estar siempre en el cuerpo de un componente. ***  
1. Es importante evitar leer el localStorage en cada render, porque leer de LS es  **lento, sincrono y  bloquea!!**.
1. Como la inicializacion del useStage solo ocurre una vez ahi inicializamos con local storage o el default.
1. Al resetear la partida no nos olvidemos que debemos resetear el local storage tambien: 
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')

1. Ejemplo de destructuring: Creamos una funcion del estilo recibe un objeto como argumentos: 
``` 
const saveDataToLS = ({aBoard, aNewTurn}) => {
    window.localStorage.setItem('board', JSON.stringify(aBoard))
    window.localStorage.setItem('turn', aNewTurn)
    }
```
Luego al invocarla hacemos algo asi:  saveDataToLS({aBoard: newBoard, aNewTurn: newTurn})
### UseEffect (Otro Hook 🤯): 
1. Nos ejecutar codigo arbitrario cuando un componente:
    1. Se monta en el DOM
    1. Cada vez que cambian las dependencias que nosotros le digamos. 
1. Esqueleto: 
```
    useEffect( una funcion ej un arrowFunction, [lista de dependencias])
``` 
1. Como mnimo se ejecuta 1 vez el useEffect (porque el comoponente se monta una vez).
1. Si no le pasaamos un parametro la funcion se ejecutara cada vez que se renderiza el componente. 
1. Si le pasamos [] como lista de dependencia solo se ejecutara el codigo al momento de montarse 
    el componente
1. Como todo Hook estos deben ir en el cuerpo de la funcion.
    1. Podemos usar el useEffect por ej:
        1. cada vez q cambia el winner enviar una peticion a la BD. 
        1. Suscribirte a eventos que son del DOM. 
1. Se pueden tener muchos useEffects.
