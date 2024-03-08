import React, { useState, useCallback } from 'react';
import QUESTIONS from './../questions';
import QuestionTimer from './QuestionTimer.jsx';
import Answers from './Answers.jsx';

export default function Quiz() {
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
      <Answers
        key={activeQuestionIndex}
        answers={QUESTIONS[activeQuestionIndex].answers}
        selectedAnswer={userAnswers[userAnswers.length - 1]}
        answerState={answerState}
        onSelect={handleSelectAnswer}
      />
    </div>
  );
}
