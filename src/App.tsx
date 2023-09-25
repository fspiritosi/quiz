import './App.css'
import { Stack, Typography, Container } from '@mui/material'
import { JavascripLogo } from './JavascripLogo'
import Start from './Start'
import { useQuestionsStore } from './store/questions'
import Game from './Game'

function App() {
  const questions = useQuestionsStore(state => state.questions)
  console.log(questions)
  return (
    <>
      <main>
        <Container maxWidth="sm">
            <Stack
              direction="row"
              gap={2}
              alignItems="center"
              justifyContent="center"
            >
              <JavascripLogo/>
              <Typography variant="h2" component="h1">
                  JavaScrip Quiz
              </Typography>
            </Stack>
            {questions.length === 0 ? <Start/> : <Game/> }
            
        </Container>
      </main>
    </>
  );
}

export default App
