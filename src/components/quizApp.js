import { useState } from "react";

const Answer = ({ answerOption, id, handleChange }) => {
  return (
    <div className="answer-text">
      <input
        type="radio"
        name="current-question"
        id={"ans" + id}
        onChange={handleChange}
        value={answerOption}
      />
      <label htmlFor={"ans" + id}>{answerOption}</label>
    </div>
  );
};

const Quiz = ({
  questions,
  setScore,
  score,
  setCurrentQuestion,
  currentQuestion,
}) => {
  const [currentAnswer, setCurrentAnswer] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target);
    //compare currentAnswer to correct ansewr
    //find correct answer by checking questions Object
    console.log(questions.answerOptions);
    //go through answerOptions
    //find the one that matches answerText
    //check it's isCorrect value if true

    const thisAnswer = questions.answerOptions.filter(
      (options) => options.answerText === currentAnswer,
    );

    if (thisAnswer[0].isCorrect) {
      setScore(score + 1);
    }

    setCurrentQuestion(currentQuestion + 1);
  };

  const handleChange = (event) => {
    console.log(event.target);
    setCurrentAnswer(event.target.value);
  };

  return (
    <div className="question">
      <div className="qtext"> {questions.questionText} </div>
      <form onSubmit={handleSubmit}>
        {questions.answerOptions.map((e, i) => (
          <Answer
            answerOption={e.answerText}
            id={i}
            key={e.answerText}
            handleChange={handleChange}
          />
        ))}

        <div>
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default function QuizzApp() {
  const questions = [
    {
      questionText: "What is the capital of France?",
      answerOptions: [
        { answerText: "New York", isCorrect: false },
        { answerText: "London", isCorrect: false },
        { answerText: "Paris", isCorrect: true },
        { answerText: "Dublin", isCorrect: false },
      ],
    },
    {
      questionText: "Who is CEO of Tesla?",
      answerOptions: [
        { answerText: "Jeff Bezos", isCorrect: false },
        { answerText: "Elon Musk", isCorrect: true },
        { answerText: "Bill Gates", isCorrect: false },
        { answerText: "Tony Stark", isCorrect: false },
      ],
    },
    {
      questionText: "The iPhone was created by which company?",
      answerOptions: [
        { answerText: "Apple", isCorrect: true },
        { answerText: "Intel", isCorrect: false },
        { answerText: "Amazon", isCorrect: false },
        { answerText: "Microsoft", isCorrect: false },
      ],
    },
    {
      questionText: "How many Harry Potter books are there?",
      answerOptions: [
        { answerText: "1", isCorrect: false },
        { answerText: "4", isCorrect: false },
        { answerText: "6", isCorrect: false },
        { answerText: "7", isCorrect: true },
      ],
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
  };

  return currentQuestion < questions.length ? (
    <>
      <div>
        score = {score} / {questions.length}
      </div>
      <Quiz
        questions={questions[currentQuestion]}
        setScore={setScore}
        score={score}
        setCurrentQuestion={setCurrentQuestion}
        currentQuestion={currentQuestion}
      />
    </>
  ) : (
    <>
      <p className="final-score">
        Your total score is {score} / {questions.length}
      </p>
      <button onClick={handleRestart}>Restart</button>
    </>
  );
}
