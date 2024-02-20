import './App.css'
import { useCatImg } from './hooks/useCatImg'
import { useCatFact } from './hooks/useCatFact'
import { Otro } from './components/Otro'

function App() {
  const {fact, refreshCat} = useCatFact()
  const imgUrl = useCatImg({fact})

  const handlerClick = () =>{
    refreshCat()
  }

  return (
    <main>
        <h1> hola mundo</h1>
        <button onClick={handlerClick}> Click for a new fact</button>
        {fact && <p> {fact} </p> }
        {imgUrl && <img src={imgUrl} alt='A img get for the three first world'/> }
    </main>
    )
}

export default App
