import { WINNER_COMBO, GAME_STATE } from "../constants"

const checkWinner = (aBoard) => {
    if (aBoard.every( (square) => { return square != null } )){
      return GAME_STATE.DRAW
    }
    for (const aCombo of WINNER_COMBO){
      const [a, b, c] = aCombo
      if (aBoard[a] && aBoard[a] == aBoard[b] && aBoard[a] == aBoard[c] ){
        return aBoard[a]
      }
    } 
    return GAME_STATE.IN_GAME
  }

export {
    checkWinner
}