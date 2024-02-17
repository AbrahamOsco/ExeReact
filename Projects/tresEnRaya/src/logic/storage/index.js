const saveDataToLS = ({aBoard, aNewTurn}) => {
    window.localStorage.setItem('board', JSON.stringify(aBoard))
    window.localStorage.setItem('turn', aNewTurn)
} 

const resetDataLS = () => {
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
} 

export {
    saveDataToLS, 
    resetDataLS
}
