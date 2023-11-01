const Answer = ({ answerOption, id, handleChange, name }) => {
  return (
    <div className="answer-text">
      <input
        type="radio"
        name={name}
        id={id}
        onChange={handleChange}
        value={answerOption}
      />
      <label htmlFor={id}>{answerOption}</label>
    </div>
  );
};

export default Answer;
