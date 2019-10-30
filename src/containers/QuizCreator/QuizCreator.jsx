import React from 'react';
import './QuizCreator.scss';
import Button from "../../components/UI/Button/Button";

class QuizCreator extends React.Component {

  submitHandler = event => {
    event.preventDefault();
  };

  render() {
    return (
      <div className="quiz-creator">
        <div>
          <h1>Создание теста</h1>

          <form onSubmit={this.submitHandler}>

            <select></select>

            <Button
              type="primary"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default QuizCreator;