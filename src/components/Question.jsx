import { useState } from 'react';
import QuestionTimer from './QuestionTimer.jsx';
import QUESTIONS from './../questions';
import Answers from './Answers.jsx';

export default function Question({ key, onSelectAnswer, onSkipAnswer }) {
  const [answer, setAnswer] = useState({ selectedAnswer: '', isCorrect: null });

  const handleSelectAnswer = (answer) => {
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null,
    });

    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: QUESTIONS[key].answers[0] === answer,
      });

      setTimeout(() => {
        onSelectAnswer(answer);
      }, 2000);
    }, 1000);
  };

  let answerState = '';

  if (answer.selectedAnswer) {
    answerState = answer.isCorrect ? 'correct' : 'wrong';
  }

  return (
    <div id="question">
      <div style={{ textAlign: 'center' }}>
        <QuestionTimer timeout={10000} onTimeout={onSkipAnswer} />
      </div>
      <p>{QUESTIONS[key].text}</p>
      <Answers
        answers={QUESTIONS[key].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectAnswer}
      />
    </div>
  );
}
