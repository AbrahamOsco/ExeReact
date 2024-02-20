import { getFactRandom } from "../services/fact"
import { useState, useEffect } from "react"

const useCatFact = () => {
    const [fact, setFact] = useState('')
    const refreshCat = () => {
      getFactRandom().then((aNewFact) => {setFact(aNewFact) })
    }
    useEffect(refreshCat, [])
    return {fact, refreshCat}
}

export {
    useCatFact
}