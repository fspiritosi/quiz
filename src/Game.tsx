import { Card, IconButton, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from "@mui/material"
import { useQuestionsStore } from "./store/questions";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { Questions } from "./types";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import Footer from "./Footer";

    const getBackgroundColor = (info: Questions, index: number) => {
      const { userSelectedAnswer, correctAnswer } = info;
      //usuario no selecciono nada
      if(userSelectedAnswer == null) return 'transparent'
      //seleccionó, pero incorrecto
      if(index !== correctAnswer && index !== userSelectedAnswer) return 'transparent'
      //si es la solución correcta
      if(index === correctAnswer) return 'green'
      //si es la respuesta seleccionada por el usuario
      if(index === userSelectedAnswer) return 'red'
      //si no es nunguna de las anteriores
      return "transpatent";
    };

const Question = ({info}: {info: Questions}) => {
    const selectAnwer = useQuestionsStore((state) => state.selectAnwer);
    // console.log(selectAnwer);
    // console.log(info)
    const createHandleClick = (answerIndex: number) => () => {
        selectAnwer(info.id, answerIndex);
    }

    return (
      <Card
        variant="outlined"
        sx={{ textAlign: "left", bgcolor: "#222", p: 2 , mt:4}}
      >
        <Typography variant="h5">{info.question}</Typography>
        <SyntaxHighlighter language="javascript" style={gradientDark}>
          {info.code}
        </SyntaxHighlighter>
        <List sx={{ bgcolor: "#333" }} disablePadding>
          {info.answers.map((answer, index) => (
            <ListItem key={index} disablePadding divider>
              <ListItemButton 
            //   disabled={info.userSelectedAnswer !== null}
              onClick={createHandleClick(index)} 
              sx={
                {backgroundColor: getBackgroundColor(info, index) }
              }
            >
                <ListItemText
                  primary={answer}
                  sx={{ textAlign: "center"}}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Card>
    );

}

function Game() {
    const questions = useQuestionsStore((state) => state.questions);
    const currentQuestion = useQuestionsStore((state)=> state.currentQuestion)
    const goNextQuestion = useQuestionsStore((state)=> state.goNextQuestion)
    const goPreviousQuestion = useQuestionsStore((state)=> state.goPreviousQuestion)

    const questionInfo = questions[currentQuestion]
    // console.log(questionInfo)
  return (
   <>
    <Stack
      direction="row"
      gap={2}
      alignItems="center"
      justifyContent="center"
    >
      <IconButton 
      onClick={goPreviousQuestion} 
      disabled={currentQuestion === 0}
      >
       <ArrowBackIosNew/>
      </IconButton>
      {currentQuestion + 1} / {questions.length}
      <IconButton 
      onClick={goNextQuestion}
      disabled={currentQuestion >= questions.length - 1}
      >
       <ArrowForwardIos/>
      </IconButton>
    </Stack>
    <Question info={questionInfo}/>
    <Footer/>
   </>
  )
}

export default Game