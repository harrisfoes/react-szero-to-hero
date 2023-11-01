import Answer from "./answer";
import { useState } from "react";

const NerdyForm = ({ getCategory, getDifficulty, getQuizTime }) => {
  const [categorySelected, setCategorySelected] = useState("");
  const [difficultySelected, setDifficultySelected] = useState("");

  const handleCategoryChange = (event) => {
    console.log(event.target.id, "cats");
    setCategorySelected(event.target.id);
  };

  const handleDifficultyChange = (event) => {
    console.log(event.target.id, "diffs");
    setDifficultySelected(event.target.id);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(categorySelected, "insubmit");
    console.log(difficultySelected, "insubmit");
    getCategory(categorySelected);
    getDifficulty(difficultySelected);
    getQuizTime(true);
  };

  const category = [
    { name: "Books", id: 10 },
    { name: "Film", id: 11 },
    { name: "Music", id: 12 },
    { name: "TV", id: 14 },
    { name: "Video Games", id: 15 },
    { name: "Anime and Manga", id: 31 },
  ];

  const difficulty = [
    { name: "Easy", id: "easy" },
    { name: "Medium", id: "medium" },
    { name: "Hard", id: "hard" },
  ];

  return (
    <div className="nerdy-form">
      <form onSubmit={handleSubmit}>
        <h2>Select a Nerdy Category</h2>
        {category.map((cats) => (
          <Answer
            key={cats.id}
            answerOption={cats.name}
            id={cats.id}
            handleChange={handleCategoryChange}
            name="category-select"
          />
        ))}

        <h2>Select Difficulty</h2>
        {difficulty.map((diff) => (
          <Answer
            key={diff.id}
            answerOption={diff.name}
            id={diff.id}
            handleChange={handleDifficultyChange}
            name="difficulty-select"
          />
        ))}
        <button>Submit</button>
      </form>
    </div>
  );
};
export default NerdyForm;
