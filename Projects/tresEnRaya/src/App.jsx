import { useState } from 'react'
import confetti from "canvas-confetti"
import { Square } from './components/Square'
import { NAME_GAME, GAME_STATE, TURNS } from './constants'
import { checkWinner } from './logic/board'
import { WinnerModal } from './components/WinnerModal'

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
    if ( newWinner == TURNS.X || newWinner == TURNS.O ){
      confetti()
      setWinner( (previewState) => {
        console.log(`Ganador ${newWinner}, el anterior era ${previewState}`)
        return newWinner
      })
    } else if (newWinner == GAME_STATE.DRAW ){
      setWinner(GAME_STATE.DRAW)
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(GAME_STATE.IN_GAME)
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
