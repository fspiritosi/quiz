import { create } from "zustand";
import { type Questions } from "../types";
import confetti from 'canvas-confetti';
import { persist } from 'zustand/middleware'



interface State {
    questions: Questions[];
    currentQuestion: number;
    fetchQuestion: (limit: number) => Promise<void>;
    selectAnwer: (questionId: number, answerIndex: number) => void;
    goNextQuestion: () => void;
    goPreviousQuestion: () => void;
    reset: () => void;
}

export const useQuestionsStore = create<State>()(persist((set, get) => {
    return {
        questions: [],
        currentQuestion: 0,
        fetchQuestion:  async(limit: number) => {
           const response = await fetch(`http://localhost:5173/data.json`);
           const data = await response.json();
           const questions = data.sort(() => Math.random() - 0.5).slice(0, limit);
           set({questions})
        },
        selectAnwer: (questionId: number, answerIndex: number) => {
            const {questions} = get();
            //usar structureClone para clona todas las preguntas
            const newQuestions =  structuredClone(questions); 
            //encontramos el indice de la pregunta
            const questionIndex = newQuestions.findIndex(q => q.id === questionId)
            //obtenemos la información de la pregunta
            const questionInfo = newQuestions[questionIndex]
            //comprueba la respuesta del usuario
            const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex
            if (isCorrectUserAnswer) {
                confetti();
            }

            //cambiar esta información en la copia de la pregunta
            newQuestions[questionIndex] = {
                ...questionInfo,
                isCorrectUserAnswer,
                userSelectedAnswer: answerIndex
        }
        //actualizar el estado
        set({questions: newQuestions})
        },
        goNextQuestion: () => {
            const {currentQuestion, questions} = get();
            const nextQuestion = currentQuestion + 1;

            if(nextQuestion < questions.length) {
                set({currentQuestion: nextQuestion})
            }
        },
        goPreviousQuestion: () => {
            const {currentQuestion} = get();
            const previousQuestion = currentQuestion - 1;

            if(previousQuestion >= 0) {
                set({currentQuestion: previousQuestion})
            }
        },
        reset:() => {
            set({questions: [], currentQuestion: 0})
        }
}},{
    name: 'questios',
    getStorage: () => localStorage
}))