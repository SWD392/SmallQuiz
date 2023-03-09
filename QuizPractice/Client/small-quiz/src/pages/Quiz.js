import axios from "axios";
import { useEffect, useState } from "react";
import "./quiz.scss";
import { ShowScore } from "./ShowScore";
const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [questions, setQuestions] = useState([]);
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setTimeLeft(timeLeft - 1);
  //   }, 1000);

  //   if (timeLeft === 0) {
  //     const nextQuestion = currentQuestion + 1;
  //     if (nextQuestion < questions.length) {
  //       setCurrentQuestion(nextQuestion);
  //       setTimeLeft(10);
  //     } else {
  //       setShowScore(true);
  //     }
  //   }

  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [timeLeft]);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        axios.get("http://localhost:8081/loadTest").then((response) => {
          setQuestions(response.data);
        });
      } catch (error) {}
    };

    fetchQuestion();
  }, []);

  const handleAnswerOptionClick = (index) => {
    const nextQuestion = currentQuestion + 1;
    if (questions[currentQuestion]?.answers[index]?.status === true) {
      setScore(score + 1);
      setCurrentQuestion(nextQuestion);
    } else {
      setCurrentQuestion(nextQuestion);
    }
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setTimeLeft(10);
    } else {
      setShowScore(true);
    }
  };

  const handlePrevious = () => {
    const previous = currentQuestion - 1;
    if (previous > -1) {
      setCurrentQuestion(previous);
      setTimeLeft(10);
    }
  };

  return (
    <div className="quiz">
      {showScore ? (
        <ShowScore score={score} questions={questions} />
      ) : (
        <>
          {/* <div className="timer-section">Time left: {timeLeft}s</div>
          <div className="question-section">
            <div className="question-count">
              <span>Question {currentQuestion + 1}</span>/{questions.length}
            </div>
            <div className="question-text">
              {questions[currentQuestion]?.content}
            </div>
          </div>
          <div className="answer-section">
            {questions[currentQuestion]?.answers.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerOptionClick(index)}
              >
                {option.content}
              </button>
            ))}
          </div>
          <div>
            <button onClick={handleNextQuestion}>Next</button>
          </div> */}
          <div className="container mt-5">
            <div className="d-flex justify-content-center align-items-center row">
              <div className="col-md-10 col-lg-10">
                <div className="border">
                  <div className="question bg-white p-3 border-bottom">
                    <div className="d-flex flex-row justify-content-between align-items-center mcq">
                      <h4>Time left: {timeLeft}</h4>
                      <span>
                        ({currentQuestion + 1} of {questions.length})
                      </span>
                    </div>
                  </div>
                  <div className="question bg-white p-3 border-bottom">
                    <div className="d-flex flex-row align-items-center question-title">
                      <h3 className="text-danger">Q.{currentQuestion + 1}, </h3>
                      <h5 className="mt-1 ml-2">
                        {questions[currentQuestion]?.content}
                      </h5>
                    </div>
                    <div className="row">
                      {questions[currentQuestion]?.answers.map(
                        (option, index) => (
                          <div key={index} className="col-md-12">
                            <label className="radio w-100 mt-3">
                              <button                               
                                key={index}
                                onClick={() => handleAnswerOptionClick(index)}
                                className="w-100 quiz-button"
                              >
                                <span className="w-100">{option.content}</span>
                              </button>
                            </label>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                  <div className="d-flex flex-row justify-content-between align-items-center p-3 bg-white">
                    {currentQuestion >= 1 ? (
                      <button
                        className="btn btn-primary d-flex align-items-center btn-danger"
                        type="button"
                        onClick={handlePrevious}
                      >
                        <i className="fa fa-angle-left mt-1 mr-1" />
                        &nbsp;Previous
                      </button>
                    ) : (
                      ""
                    )}
                    <button
                      className="btn btn-primary border-success align-items-center btn-success"
                      type="button"
                      onClick={handleNextQuestion}
                    >
                      Next
                      <i className="fa fa-angle-right ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
