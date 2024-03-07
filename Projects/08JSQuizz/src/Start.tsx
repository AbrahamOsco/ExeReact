import { Button } from "@mui/material"
import { useQuestionStore } from "./store/questions"

export const Start = () => {
    const fetchQuestions = useQuestionStore( (state) => { return state.fetchQuestions }  )

    const handlerClick = () => { 
        fetchQuestions(5)
    }

    return (
        <Button onClick={ handlerClick } variant="contained"> Empezar!! </Button>
    )

}