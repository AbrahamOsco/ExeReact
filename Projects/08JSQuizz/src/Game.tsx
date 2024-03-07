import { Card, IconButton, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from "@mui/material"
import { useQuestionStore } from "./store/questions"
import { type Question as QuestionType  } from "./types"
import SyntaxHighlighter from 'react-syntax-highlighter';
import { hopscotch } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { Footer } from "./Footer";

const getBackground = (info:QuestionType, index:number) => {
    const {userSelectedAnswer, correctAnswer } = info;
    if (userSelectedAnswer == null) return 'transparent' // si la opcion nunca fue marcada
    // si la opcion es distinta de la correcta y tampoco fue marcada por el usuario transparent
    else if (index != correctAnswer && index != userSelectedAnswer ) return 'transparent'
    else if (index == correctAnswer) return 'green'     // si el usuario marco la correcta 
    else if (index == userSelectedAnswer ) return 'red'     // si el usuario marco la incorrecta. 
    return 'transparent'
}

const Question = ({info} : { info : QuestionType} )  => {
    const selectAnswer = useQuestionStore( (state) => {return state.selectAnswer})
    const createHandler = (answerIndex: number) => { return (()=> { selectAnswer(info.id, answerIndex)})  }
    return (
        <Card variant='outlined' sx={ {textAlign:'left', p:2, bgcolor: "#222", marginTop:5 } }  >
            <Typography variant="h5">
                {info.question}            
            </Typography>
            <SyntaxHighlighter language="javascript" style={hopscotch} >
                {info.code}
            </SyntaxHighlighter>
            <List sx={ {bgcolor:"#333", textAlign:"center" }} disablePadding >
                {info.answers.map( (answer, index) => { 
                    return (
                        <ListItem key={index} divider disablePadding >
                            <ListItemButton disabled={info.userSelectedAnswer != null}  onClick={createHandler(index)}
                                     sx={{ background: getBackground(info, index) }}  >
                                <ListItemText primary={answer} sx={{textAlign:'center'}} />                                                            
                            </ListItemButton>
                        </ListItem>
                    )
                } ) }
                
            </List>        
        </Card>
    )
} 

export const Game = () => {
    const allQuestions = useQuestionStore( (state) => {return state.questions})
    const currentQuestion  = useQuestionStore( (state) => { return state.currentQuestion} )
    const goNextQuestion = useQuestionStore( (state) => {return state.goNextQuestion})
    const goPreviusQuestion  = useQuestionStore( (state) => {return state.goPreviusQuestion} )

    const questionInfo = allQuestions[currentQuestion]
    
    console.log(allQuestions)
    return (
    <>
        <Stack direction="row" gap={2} alignItems="center" justifyContent="center">
            <IconButton onClick={goPreviusQuestion} disabled={currentQuestion == 0}> 
                <ArrowBackIos> </ArrowBackIos>
            </IconButton>
                {currentQuestion +1} / {allQuestions.length}
            <IconButton onClick={goNextQuestion} disabled={currentQuestion >= (allQuestions.length-1)  }> 
                <ArrowForwardIos> </ArrowForwardIos>
            </IconButton>
        </Stack>
        <Question info={questionInfo}  />
        <Footer/>
    </>)
}