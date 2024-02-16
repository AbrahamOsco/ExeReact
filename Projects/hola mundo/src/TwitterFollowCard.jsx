import "./App.css"
import {useState} from 'react'

const TwitterFollowCard = ( { children, initIsFollowing, unElement, formatUserName, userName='unknown', name}) => {
    // userName = `@¶${userName}` ERROR las props deberian ser inmutables.
    const [isFollowing, setIsFollowing] = useState(initIsFollowing)
    console.log('Render with in TwitterFollowCard', name)

    let buttonClassName = 'tw-followCard-button'
    let textButton = 'Seguir'
    if (isFollowing){
        textButton = 'Siguiendo'
        buttonClassName = 'tw-followCard-button is-following'
    }
    const handlerClickBtn = () => {
        setIsFollowing(!isFollowing)
    }


    return (
        <article className="tw-followCard" >
            <header className="tw-followCard-header">
                <img className="tw-followCard-avatar"
                    src = {`https://unavatar.io/${userName}`}  alt="una imagen random" />
                <div className="tw-followCard-info">
                    <strong> {name}</strong>
                    <span>{formatUserName(userName)} {unElement} </span>
                    <span> {children} </span>
                </div>
            </header>
            <aside>
                <button className={buttonClassName} onClick={handlerClickBtn} >
                    <span className="tw-followCard-text"> {textButton} </span>
                    <span className="tw-followCard-stopFoll">Dejar de seguir</span>
                </button>
            </aside>
        </article>
    )
}

export {
    TwitterFollowCard    
}