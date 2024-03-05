import React, { useState, useCallback } from 'react';
import QUESTIONS from './../questions';
import QuestionTimer from './QuestionTimer.jsx';

export default function Quiz() {
  // const [activeQuestionIndex, setActiveQuestionIndex] = useState(QUESTIONS);
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    selectedAnswer
  ) {
    setUserAnswers((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    });
  },
  []);

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  if (quizIsComplete) {
    return (
      <div id="summary">
        <h1 style={{ textAlign: 'center' }}>Quiz Completed</h1>;
      </div>
    );
  }

  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);

  return (
    <div className="displayQuestion">
      <div style={{ textAlign: 'center' }}>
        <QuestionTimer timeout={10000} onTimeout={handleSkipAnswer} />
      </div>

      <p>{QUESTIONS[activeQuestionIndex].text}</p>
      <ul id="answers">
        {shuffledAnswers.map((answer) => (
          <li key={answer} className="answer">
            <button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
