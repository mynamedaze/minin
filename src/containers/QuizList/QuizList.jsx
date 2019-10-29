import React from 'react';
import './QuizList.scss';
import {NavLink} from "react-router-dom";

class QuizList extends React.Component {

  renderQuizes() {
    return [1, 2, 3].map((quiz, index) => {
      return (
        <li
          key={index}
        >
          <NavLink to={'/quiz/' + quiz}>
            Тест {quiz}
          </NavLink>
        </li>
      )
    });
  }

  render() {
    return (
      <div className="quiz-list">
        <div>
          <h1>Список тестов</h1>

          <ul>
            {this.renderQuizes() }
          </ul>
        </div>
      </div>
    );
  }
}

export default QuizList;