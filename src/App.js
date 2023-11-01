import "./App.css";
import QuizApp from "./components/quizApp";
import NerdyForm from "./components/nerdyForm";
import { useState } from "react";

function App() {
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [quizTime, setQuizTime] = useState(false);

  const getQuizTime = (flag) => {
    console.log(flag, "quiz time");
    setQuizTime(flag);
  };

  return (
    <div className="App">
      <h1>Take the nerdy Quiz</h1>
      {!quizTime ? (
        <NerdyForm
          getDifficulty={setDifficulty}
          getCategory={setCategory}
          getQuizTime={getQuizTime}
        />
      ) : (
        <QuizApp
          category={category}
          difficulty={difficulty}
          setQuizTime={setQuizTime}
        />
      )}
    </div>
  );
}

export default App;
