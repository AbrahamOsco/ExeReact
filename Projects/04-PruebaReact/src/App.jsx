import { useState, useEffect } from 'react'

let firstWorld = "" 
const CAT_ENDPOINT_RANDOM_FACT = "https://catfact.ninja/fact"
const CAT_ENDPOINT_IMG_URL = `https://cataas.com/cat/says/${firstWorld}?fontSize=50&fontColor=red&json=true`

function App() {
  const [fact, setFact] = useState('')
  
  useEffect( () => {
    console.log("effect")
    fetch(CAT_ENDPOINT_RANDOM_FACT)
    .then( (res) => { return res.json() })
    .then( (data) => { return setFact(data.fact) } )
  },[])
  

  return (
    <>
    <h1> hola mundo</h1>
    {fact && <p> {fact} </p> }
    </>
  )
}

export default App
