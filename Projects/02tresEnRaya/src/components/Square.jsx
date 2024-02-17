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

export { 
    Square
}