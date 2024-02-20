import { useCatImg } from "../hooks/useCatImg"

const Otro = () => {
    const imgUrl = useCatImg({fact:'cat'})
    return <>
        {imgUrl && <img src={imgUrl} alt='A img random'/> }
    </>
}

export {
    Otro
}