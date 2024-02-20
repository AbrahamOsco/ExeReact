import { useState, useEffect } from "react"
const CAT_PREFIX = "https://cataas.com/cat/says/"

const useCatImg = ({fact}) => {
    const [imgUrl, setImgUrl] = useState('')
    useEffect( () => {
      if(fact == '' || fact == undefined) return 
      console.log("effect 2", fact)    
      const threeFirstWords = fact.split(' ',3).join(' ')
      fetch(`https://cataas.com/cat/says/${threeFirstWords}?fontSize=50&fontColor=red&json=true`)
      .then( (res) => {return res.json()} )
      .then( (response) => {
        const aIdImg = response._id
        console.log('ImgId is:', aIdImg)
        setImgUrl(threeFirstWords)
      })
    }, [fact])
    return `${CAT_PREFIX}${imgUrl}`
}

export{
    useCatImg
}

