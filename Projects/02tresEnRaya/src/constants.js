const NAME_GAME = {
    A_NAME: 'Hachas o Maderas'
}

const TURNS = {
    X: '🪓', 
    O: '🪵',
  }
  
  const GAME_STATE = {
    IN_GAME:'I',
    DRAW:'.'
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

export {
    NAME_GAME, TURNS, GAME_STATE, WINNER_COMBO
}