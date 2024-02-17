import { useState, useEffect } from 'react'

const FollowMouse = () => {
  const [enable, setEnabled] = useState(false)
  const textButton = (enable ? 'Desactivar' : 'Activar') + ' puntero'
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const positionText = 'Position X: '+ position.x.toFixed(3) + '  Position Y:' + position.y.toFixed(3) 
  useEffect(() => {
    console.log('efecto', { enable })
    const handlerMove = (event) => {
        console.log('Entro al handler')
        const { clientX, clientY } = event
        setPosition({ x: clientX, y: clientY })
    }
    if (enable) {
      window.addEventListener('pointermove', handlerMove)
    }
    return () => {
      console.log('cleanUP')
      window.removeEventListener('pointermove', handlerMove)
    }
  }, [enable])

  const handlerClick = () => {
    setEnabled(!enable)
  }
  // Aca si enable es true agregamos la clase no-cursor del body
  //  y si es false eliminamos la clase no-cursor del body
  useEffect( ()=>{
    document.body.classList.toggle('no-cursor', enable)
    
    return (() => {
      document.body.classList.remove('no-cursor')
    })
  },[enable] )
  // cuando se desmonta el componente elimina el no-cursor (por el remove en el return)
  
  useEffect( () => {
    if(!enable){
      setPosition({ x:0, y:0})
    } 

  },[])


  return (
    <>
      <div style={{
        position: 'absolute',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        border: '1px solid white',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -25,
        top: -25,
        width: 50,
        height: 50,
        transform: `translate(${position.x}px, ${position.y}px)`
      }}
      />
      <h2> Mouse Follower 🤯🖱️ </h2>
      <h3> {positionText}</h3>
      <button onClick={handlerClick}> {textButton} </button>
    </>)
}

export{
    FollowMouse   
}