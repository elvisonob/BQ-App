import QuestionTimer from './QuestionTimer.jsx';
import Answers from './Answers.jsx';

export default function Question({
  questionText,
  answers,
  onSelectAnswer,
  selectedAnswer,
  answerState,
  onSkipAnswer,
}) {
  return (
    <div id="question">
      <div style={{ textAlign: 'center' }}>
        <QuestionTimer timeout={10000} onTimeout={onSkipAnswer} />
      </div>
      <p>{questionText}</p>
      <Answers
        answers={answers}
        selectedAnswer={selectedAnswer}
        answerState={answerState}
        onSelect={onSelectAnswer}
      />
    </div>
  );
}
