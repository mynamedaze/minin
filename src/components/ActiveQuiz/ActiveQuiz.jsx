import React from 'react';
import './ActiveQuiz.scss';
import AnswersList from "./AnswersList/AnswersList";

const ActiveQuiz = props => (
  <div className="activeQuiz">
    <p className="question">
      <span>
        <strong>{props.answerNumber}.</strong>&nbsp;
        {props.question}
      </span>
      <small>{props.answerNumber} из {props.quizLength}</small>
    </p>
    <AnswersList
      answers={props.answers}
      isAnswerRight={props.isAnswerRight}
      onAnswerClick={props.onAnswerClick}
    />
  </div>
);

export default ActiveQuiz;