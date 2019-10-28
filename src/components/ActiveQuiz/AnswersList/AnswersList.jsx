import React from 'react';
import './AnswersList.scss';
import AnswerItem from "./AnswerItem/AnswerItem";

const AnswersList = props => (
  <ul className="answers-list">
    { props.answers.map((answer, index) => {
      return (
        <AnswerItem
          key={index}
          answer={answer}
          isAnswerRight={props.isAnswerRight ? props.isAnswerRight[answer.id] : null}
          onAnswerClick={props.onAnswerClick}
        />
      )
    })}
  </ul>
);

export default AnswersList;