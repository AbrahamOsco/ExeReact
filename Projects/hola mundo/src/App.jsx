import { TwitterFollowCard } from "./TwitterFollowCard"
import { useState } from "react"

const users = [
    {
        userName:'hola',
        name: 'Abraham 1234',
        isFollow: true
    },
    {
        userName:'elonmusk',
        name: 'Elon musk',
        isFollow: true
    },
    {
        userName:'Paco',
        name: 'Paco Yunque',
        isFollow: false
    },
    {
        userName:'TmChein',
        name: 'Tomas',
        isFollow: false
    }
]


const App = () => {
    const formatName = (userName) => { return `@${userName}` }
    const aElement = <span>-x</span>
    const [name, setName] = useState('darko1234')
    const [isFollow, setIsFollow] = useState(false) 
    console.log('Render with', name, isFollow)
    
    const handlerClickBtn = () => {
        setName('pedromichel')
        setIsFollow(!isFollow)
    }

    return (
        <section className="App"> 
            {
                users.map( ({userName, name, isFollow}) => {
                return (
                    <TwitterFollowCard key={userName} initIsFollowing={isFollow} 
                        unElement={aElement} formatUserName={formatName}
                        userName={userName} name={name} >
                    </TwitterFollowCard>
                )
                }) 
            }
        </section>           
    )
} 

export {
    App
}