import { useQuestionStore } from "../store/questions"


export const useQuestionData = () => {
    const questions = useQuestionStore( (state) => {return state.questions})
    let correct = 0
    let incorrect = 0
    let unAnswered = 0
    questions.forEach((aQuestion) => {
        const {userSelectedAnswer, correctAnswer } = aQuestion
        if (userSelectedAnswer == null) unAnswered ++
        else if (userSelectedAnswer == correctAnswer) correct++ 
        else incorrect++
    });

    return {correct, incorrect, unAnswered}
}
