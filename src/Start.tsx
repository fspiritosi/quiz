import { Button } from '@mui/material'
import { useQuestionsStore } from './store/questions'

const LIMIT_QUESTIONS = 10;
//IDEA: que el usuario pueda elegir la cantidad de preguntas que quiere que le haga el quiz
//para eso, puedo realizar un estado global que me maneje el numero de preguntas.

function Start() {
    const fetQuestions = useQuestionsStore(state => state.fetchQuestion)

    const handleClik = () => {
        fetQuestions(LIMIT_QUESTIONS)
    }
  return (
   <Button onClick={handleClik} variant='contained'>
    ¡Emprezar!
   </Button>
  )
}

export default Start