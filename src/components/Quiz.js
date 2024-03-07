import React, { useState, useCallback, useRef } from 'react';
import QUESTIONS from './../questions';
import QuestionTimer from './QuestionTimer.jsx';

export default function Quiz() {
  const shuffledAnswers = useRef();
  const [answerState, setAnswerState] = useState('');
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex =
    answerState === '' ? userAnswers.length : userAnswers.length - 1;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer) {
      setAnswerState('answered');
      setUserAnswers((prevUserAnswers) => {
        return [...prevUserAnswers, selectedAnswer];
      });

      setTimeout(() => {
        if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
          setAnswerState('correct');
        } else {
          setAnswerState('wrong');
        }

        setTimeout(() => {
          setAnswerState('');
        }, 2000);
      }, 1000);
    },
    [activeQuestionIndex]
  );

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  if (quizIsComplete) {
    return (
      <div id="summary">
        <h1 style={{ textAlign: 'center' }}>Quiz Completed</h1>
      </div>
    );
  }

  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...QUESTIONS[activeQuestionIndex].answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }

  return (
    <div className="displayQuestion">
      <div style={{ textAlign: 'center' }}>
        <QuestionTimer
          key={activeQuestionIndex}
          timeout={10000}
          onTimeout={handleSkipAnswer}
        />
      </div>

      <p>{QUESTIONS[activeQuestionIndex].text}</p>
      <ul id="answers">
        {shuffledAnswers.current.map((answer) => {
          const isSelected = userAnswers[userAnswers.length - 1] === answer;
          let cssClass = '';

          if (answerState === 'answered' && isSelected) {
            cssClass = 'selected';
          }

          if (
            (answerState === 'correct' || answerState === 'wrong') &&
            isSelected
          ) {
            cssClass = answerState;
          }
          return (
            <li key={answer} className="answer">
              <button
                onClick={() => handleSelectAnswer(answer)}
                className={cssClass}
              >
                {answer}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
