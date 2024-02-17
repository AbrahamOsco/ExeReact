import { useState, useEffect } from 'react'
import confetti from "canvas-confetti"
import { Square } from './components/Square'
import { NAME_GAME, GAME_STATE, TURNS } from './constants'
import { checkWinner } from './logic/board'
import { WinnerModal } from './components/WinnerModal'
import { saveDataToLS, resetDataLS } from './logic/storage'

const getBoard = () => {
  const boardFromLS = window.localStorage.getItem('board')
  if (boardFromLS) return JSON.parse(boardFromLS)
  return Array(9).fill(null)
}
const getTurn = () => {
  const turnFromLS = window.localStorage.getItem('turn')
  if (turnFromLS) return turnFromLS
  return TURNS.X
}

function App() {
  const [board, setBoard] = useState(getBoard)
  const [turn, setTurn] = useState(getTurn)

  const [winner, setWinner] = useState(GAME_STATE.IN_GAME)
  const updateBoard = (index) => {
    if( board[index] || winner != GAME_STATE.IN_GAME) return
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    const newTurn = (turn == TURNS.X ? TURNS.O : TURNS.X)
    setTurn(newTurn)
    saveDataToLS({aBoard: newBoard, aNewTurn: newTurn})
    const newWinner = checkWinner(newBoard)
    if ( newWinner == TURNS.X || newWinner == TURNS.O ){
      confetti()
      setWinner( (previewState) => { return newWinner })
    } else if (newWinner == GAME_STATE.DRAW ){
      setWinner(GAME_STATE.DRAW)
    }
  }
  useEffect( ()=> {
    console.log('Uso usserEffect()')
  }, [winner] )

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(GAME_STATE.IN_GAME)
    resetDataLS()
  }


 
  return (
    <main className='board'>
      <h1>{NAME_GAME.A_NAME}</h1>
      <button onClick={resetGame}> Reset game</button>
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
        <Square isSelect={ turn == TURNS.X} >
          {TURNS.X}
        </Square>
        <Square isSelect={ turn == TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
      <WinnerModal resetGame={resetGame} winner={winner}/>
    </main>
  )
}

export default App
