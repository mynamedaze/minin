import React from 'react';
import './Quiz.scss';
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: {}, // {[id]: 'success' 'error' }
      isFinished: false,
      activeQuestion: 0,
      answerState: null, // { [id]: 'success' 'error' }
      quiz: [
        {
          id: 1,
          question: 'Какого цвета Адыгский флаг',
          rightAnswerId: 2,
          answers: [
            {id: 1, text: 'ЧОрный'},
            {id: 2, text: 'Зеленый УЭЙ УЭЙ'},
            {id: 3, text: 'Синий'},
            {id: 4, text: 'Красный'}
          ]
        },
        {
          id: 2,
          question: 'Самая крутая машина',
          rightAnswerId: 4,
          answers: [
            {id: 1, text: 'БЭЭНВЭ'},
            {id: 2, text: 'Приора'},
            {id: 3, text: 'Белая Приора'},
            {id: 4, text: 'Белая Приора НИЗКАЯ, на чОтких ВСМПО, затонирована в круг!!!'}
          ]
        }
      ]
    };
  }

  onAnswerClickHandler = (answerId) => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0];
      if (this.state.answerState[key] === 'success') {
        return;
      }
    }

    const question = this.state.quiz[this.state.activeQuestion];
    const results = this.state.results;

    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = 'success';
      }

      this.setState({
        answerState: {[answerId]: 'success'},
        results
      });

      const timeout = setTimeout(() => {
        if (this.isQuizFinished()) {
          this.setState({
            isFinished: true
          })
        } else {
          this.setState((state) => ({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null
          }));
        }

        clearTimeout(timeout);
      }, 1000);
    } else {
      results[question.id] = 'error';
      this.setState({
        answerState: {[answerId]: 'error'},
        results
      });
    }
  };

  isQuizFinished = () => {
    return this.state.activeQuestion + 1 === this.state.quiz.length
  };

  retryHandler = () => {
    this.setState({
      activeQuestion: 0,
      answerState: null,
      isFinished: false,
      results: {}
    });
  };

  render() {
    return (
      <div className="quiz">
        <div className="wrapper">
          <h1>Ответьте на все вопросы</h1>
          {
            this.state.isFinished
              ? <FinishedQuiz
                  results={this.state.results}
                  quiz={this.state.quiz}
                  onRetry={this.retryHandler}
              />
              : <ActiveQuiz
                  answers={this.state.quiz[this.state.activeQuestion].answers}
                  question={this.state.quiz[this.state.activeQuestion].question}
                  quizLength={this.state.quiz.length}
                  answerNumber={this.state.activeQuestion + 1}
                  isAnswerRight={this.state.answerState}
                  onAnswerClick={this.onAnswerClickHandler}
              />
          }
        </div>
      </div>
    )
  }
}

export default Quiz;