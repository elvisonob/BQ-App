import React, { useState } from 'react';
import QUESTIONS from './../questions';

export default function Quiz() {
  // const [activeQuestionIndex, setActiveQuestionIndex] = useState(QUESTIONS);
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;

  const handleSelectAnswer = (selectedAnswer) => {
    setUserAnswers((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    });
  };
  return (
    <div className="displayQuestion">
      <p>{QUESTIONS[activeQuestionIndex].text}</p>
      <ul id="answers">
        {QUESTIONS[activeQuestionIndex].answers.map((answer) => (
          <li key={answer} className="answer">
            <button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
