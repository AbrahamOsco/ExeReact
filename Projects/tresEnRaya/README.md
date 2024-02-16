# Juego tres en raya 🤯 :facepunch:

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
1.  

