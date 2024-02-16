import { GAME_STATE } from "../constants"
import { Square } from "./Square"

const WinnerModal = ({ winner, resetGame }) => {
    if (winner == GAME_STATE.IN_GAME) return
    const winnerText = winner == '.' ? 'Empate' : 'Gano'
    return (
        (
            <section className='winner'>
                <div className='text'>
                    <h2>
                        {winnerText}
                    </h2>
                    <header className='win'>
                        {winner && <Square>{winner} </Square>}
                    </header>
                    <footer>
                        <button onClick={resetGame}> Empezar de nuevo </button>
                    </footer>
                </div>
            </section>
        )
    )
}

export {
    WinnerModal
}