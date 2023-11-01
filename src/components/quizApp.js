import { useState, useEffect } from "react";
import getAll from "../services/quiz";
import Answer from "./answer";

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

  //Converts html code to regular characters
  function cleanupCharacters(question) {
    return question
      .replace(/(&quot\;)/g, '"')
      .replace(/(&rsquo\;)/g, '"')
      .replace(/(&#039\;)/g, "'")
      .replace(/(&amp\;)/g, '"')
      .replace(/(&shy\;)/g, "-");
  }

  return (
    <div className="question">
      <div className="qtext"> {cleanupCharacters(questions.questionText)} </div>
      <form onSubmit={handleSubmit}>
        {questions.answerOptions.map((e, i) => (
          <Answer
            answerOption={cleanupCharacters(e.answerText)}
            name={`question-${currentQuestion}`}
            id={i}
            key={cleanupCharacters(e.answerText)}
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

export default function QuizzApp({ category, difficulty, setQuizTime }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  console.log(category, difficulty, "in quizapp");

  useEffect(() => {
    setLoading(true);
    console.log(category, difficulty, "in useffect");
    getAll(category, difficulty).then((qs) => {
      const questionsFormatted = qs.results.map((questions) => {
        const randomizedAnswers = [
          { answerText: questions.incorrect_answers[0], isCorrect: false },
          { answerText: questions.incorrect_answers[1], isCorrect: false },
          { answerText: questions.incorrect_answers[2], isCorrect: false },
          { answerText: questions.correct_answer, isCorrect: true },
        ].sort(() => Math.random() - 0.5);
        return {
          questionText: questions.question,
          answerOptions: randomizedAnswers,
        };
      });

      console.log(questionsFormatted);
      setQuestions(questionsFormatted);

      //setRestart(false);

      setInterval(() => setLoading(false), 1000);
    });
  }, []);

  const handleRestart = () => {
    setQuestions([]);
    setCurrentQuestion(0);
    setScore(0);
    setQuizTime(false);
  };

  return (
    <div>
      {loading ? (
        <h1>"Trivia questions loading..."</h1>
      ) : (
        <div>
          {currentQuestion < questions.length ? (
            <>
              <div>
                score: {score} / {questions.length}
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
          )}
        </div>
      )}
    </div>
  );
}

/*
  const qs = [
    //dummy data
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
*/
