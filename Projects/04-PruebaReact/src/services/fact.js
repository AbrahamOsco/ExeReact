const CAT_ENDPOINT_RANDOM_FACT = "https://catfact.ninja/fact"

const getFactRandom = () => {
    return fetch(CAT_ENDPOINT_RANDOM_FACT)
    .then( (res) => { 
      if (!res.ok) throw new Error('Error fetching fact')
      return res.json()
    }).then( (data) => { 
      const aFact = data.fact // del json data, {fact:"", length:x} me quedo unicamente con el valor de fact
      return aFact
    }).catch( () => { console.log('Error catacheado')} )
  }

export {
    getFactRandom
}

