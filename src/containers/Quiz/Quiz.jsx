import React from 'react';
import './Quiz.scss';
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Loader from "../../components/UI/Loader/Loader";
import {connect} from "react-redux";
import {fetchQuizById, quizAnswerClick, retryQuiz} from "../../Store/actions/quizAction";

class Quiz extends React.Component {

  componentDidMount() {
    this.props.fetchQuizById(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.retryQuiz();
  }

  render() {
    return (
      <div className="quiz">
        <div className="wrapper">
          <h1>Ответьте на все вопросы</h1>

          {this.props.loading || !this.props.quiz
            ? <div className="loader-wrapper"><Loader/></div>
            : this.props.isFinished
                  ? <FinishedQuiz
                    results={this.props.results}
                    quiz={this.props.quiz}
                    onRetry={this.props.retryQuiz}
                  />
                  : <ActiveQuiz
                    answers={this.props.quiz[this.props.activeQuestion].answers}
                    question={this.props.quiz[this.props.activeQuestion].question}
                    quizLength={this.props.quiz.length}
                    answerNumber={this.props.activeQuestion + 1}
                    isAnswerRight={this.props.answerState}
                    onAnswerClick={this.props.quizAnswerClick}
                  />
              }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    results: state.quiz.results,
    isFinished: state.quiz.isFinished,
    activeQuestion: state.quiz.activeQuestion,
    answerState: state.quiz.answerState,
    quiz: state.quiz.quiz,
    loading: state.quiz.loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizById: id => dispatch(fetchQuizById(id)),
    quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
    retryQuiz: () => dispatch(retryQuiz())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);