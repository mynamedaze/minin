import React from 'react';
import './Quiz.scss';
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import axios from "../../axios/axios-quiz";
import Loader from "../../components/UI/Loader/Loader";

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: {}, // {[id]: 'success' 'error' }
      isFinished: false,
      activeQuestion: 0,
      answerState: null, // { [id]: 'success' 'error' }
      quiz: [],
      loading: true
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

  async componentDidMount() {
    try {
      const response = await axios.get(`/quizes/${this.props.match.params.id}.json`);
      const quiz = response.data;
      console.log(response);

      this.setState({
        quiz,
        loading: false
      })
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div className="quiz">
        <div className="wrapper">
          <h1>Ответьте на все вопросы</h1>

          {this.state.loading
            ? <div className="loader-wrapper"><Loader/></div>
            : this.state.isFinished
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