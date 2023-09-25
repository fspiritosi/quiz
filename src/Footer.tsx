
import { Button } from "@mui/material";
import {useQuestionData} from "./hooks/useQuestionsData"
import { useQuestionsStore } from "./store/questions";



function Footer() {
   
 const {correct, incorrect, unanswered} = useQuestionData();
const reset = useQuestionsStore((state) => state.reset);
  return (
   
    <footer style={{ marginTop: "16px" }}>
      <strong>{`✅ ${correct} ${
        correct === 1 ? "Correcta" : "Correctas"
      } - ❌ ${incorrect} ${
        incorrect === 1 ? "Incorrecta" : "Incorrectas"
      } - ❓ ${unanswered} ${
        unanswered === 1 ? "Pendiente" : "Pendientes"
      }`}</strong>
      <div style={{marginTop:'16px'}}>
      <Button onClick={() => reset()}>Reiniciar</Button> 
      </div>
    </footer>
  );
}

export default Footer