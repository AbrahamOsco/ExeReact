import { useState } from 'react'
import './App.css'

const TURNS = {
  X:'X',
  O:'O'
}

const GAME_STATE = {
  IN_GAME:'I',
  WIN:'W',
  DRAW:'D'
}

const WINNER_COMBO = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]


// crearemos un componente square. 
const Square = ( {children, isSelect, updateBoard, index} ) => {
  const aClassName = 'square' + (isSelect ? ' is-selected' : '')
  const handlerClick = () => {
    updateBoard(index)
  }

  return (
    <div onClick={handlerClick} className={aClassName}>
      {children}
    </div>
  )
} 


function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(GAME_STATE.IN_GAME)

  const updateBoard = (index) => {
    console.log(winner)
    if( board[index] || winner != GAME_STATE.IN_GAME) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = (turn == TURNS.X ? TURNS.O : TURNS.X)
    setTurn(newTurn)
    const newWinner = checkWinner(newBoard)
    if (newWinner == 'W'){
      setWinner( (previewState) => {
        console.log(`Ganador ${newWinner}, el anterior era ${previewState}`)
        return newWinner
      })
    } else if (newWinner == 'D'){
      setWinner(GAME_STATE.DRAW)
    }
    
  }

  const checkWinner = (aBoard) => {
    for (const aCombo of WINNER_COMBO){
      const [a, b, c] = aCombo
      if (aBoard[a] && aBoard[a] == aBoard[b] && aBoard[a] == aBoard[c] ){
        return GAME_STATE.WIN
      }
    }
    let jugadas = 0
    for (const elemento of aBoard){
      if (elemento){
        jugadas +=1
      }
    }
    if (jugadas == 9 ){
      return GAME_STATE.DRAW
    } 
    return GAME_STATE.IN_GAME
  }
  
  return (
    <main className='board'>
      <h1>Tic tac toe</h1>
      <section className='game'>
        {
          board.map( (_, index) => {
            return (
              <Square key={index} index={index} updateBoard={updateBoard} >
                {board[index]}
              </Square>
            )
          } )
        }
      </section>
      <section className="turn">
        <Square isSelect={ turn == 'X'} >
          {TURNS.X}
        </Square>
        <Square isSelect={ turn == 'O'}>
          {TURNS.O}
        </Square>
      </section>

    </main>
  )
}

export default App
