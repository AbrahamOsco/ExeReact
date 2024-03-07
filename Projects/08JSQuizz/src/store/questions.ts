import { create } from "zustand";
import { Question } from "../types";
import confetti from "canvas-confetti";
import { persist, devtools } from "zustand/middleware";


interface State{
    questions: Question[]
    currentQuestion: number
    fetchQuestions: (limit:number) => Promise<void>
    selectAnswer: (questionId: number, answerIndex: number) => void 
    goNextQuestion: () => void
    goPreviusQuestion: () => void
    reset: () => void
}

// creamos el midleware
const logger = (config) => (set, get, api) => {
    return config(
        (...args) => {
            console.log('apply', args)
            set(... args)
            console.log('new state 🏟️', get())
        }
    ,get, api)
}

export const useQuestionStore = create<State>()(devtools(persist( (set, get) => {
    return {
        questions:[],
        currentQuestion: 0,
        fetchQuestions: async( limit:number) => {
            const res = await fetch('http://localhost:5173/data.json')
            const json = await res.json()
            const questions = json.sort( () => {return Math.random() - 0.5 }).slice(0, limit)
            console.log(questions)
            set({questions}, false, 'FETCH_QUESTION')
            //set()
        },
        selectAnswer: (questionId:number, answerIndex: number) => {
            const {questions} = get()
            const newQuestions = structuredClone(questions)
            const questionIndex = newQuestions.findIndex( (q) => {return q.id == questionId})
            const questionInfo = newQuestions[questionIndex]
            const isCorrectUserAnswer = questionInfo.correctAnswer == answerIndex
            if(isCorrectUserAnswer) confetti()
            newQuestions[questionIndex] = {
                ...questionInfo,
                isCorrectUserAnswer,
                userSelectedAnswer: answerIndex
            }
            set({questions: newQuestions})
        }, 
        goNextQuestion: () => {
            const { currentQuestion, questions } = get()
            const nextQuestionPos = currentQuestion + 1
            if (nextQuestionPos < questions.length ){
                set({currentQuestion: nextQuestionPos})
            }
        }, goPreviusQuestion: () => {
            const {currentQuestion} = get()
            const previusQuestionPos = currentQuestion - 1 
            if ( previusQuestionPos >= 0 ){
                set({currentQuestion: previusQuestionPos})
            } 
        }, reset: () => {
            set({currentQuestion:0, questions: []} )
        }
    }
}  , {name:"question",  } )))


