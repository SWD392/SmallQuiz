import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { getTestQuestions } from "../service/requestAPI";
import "./quiz.scss";
import { ShowScore } from "./ShowScore";
const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [questions, setQuestions] = useState([]);
  const [questionId, setQuestionId] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState([]);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setTimeLeft(timeLeft - 1);
  //   }, 1000);

  //   if (timeLeft === 0) {
  //     const nextQuestion = currentQuestion + 1;
  //     if (nextQuestion < questions.length) {
  //       setCurrentQuestion(nextQuestion);
  //       setTimeLeft(30);
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
      const questionsData = await getTestQuestions();
      setQuestions(questionsData);
    };

    fetchQuestion();
  }, []);

  const handleAnswerOptionClick = (index) => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      if (questions[currentQuestion].answers[index]?.status === true) {
        setScore(score + 1);
        setCurrentQuestion(nextQuestion);
        setQuestionId([...questionId, questions[currentQuestion]?.id]);
        setSelectedAnswer([
          ...selectedAnswer,
          questions[currentQuestion]?.answers[index]?.id,
        ]);
      } else {
        setCurrentQuestion(nextQuestion);
        setQuestionId([...questionId, questions[currentQuestion]?.id]);
        setSelectedAnswer([
          ...selectedAnswer,
          questions[currentQuestion]?.answers[index]?.id,
        ]);
      }
    } else if(nextQuestion === questions.length) {
      setScore(score + 1);
      setQuestionId([...questionId, questions[currentQuestion]?.id]);
        setSelectedAnswer([
          ...selectedAnswer,
          questions[currentQuestion]?.answers[index]?.id,
        ]);
        setShowScore(true);
    }
  };
  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setTimeLeft(30);
    } else {
      setShowScore(true);
    }
  };

  const handlePrevious = () => {
    const previous = currentQuestion - 1;
    if (previous > -1) {
      setCurrentQuestion(previous);
      setTimeLeft(30);
      const newQuestionIds = [...questionId];
      newQuestionIds.splice(previous, 1);
      setQuestionId(newQuestionIds);
      const newAnswerIds = [...selectedAnswer];
      newAnswerIds.splice(previous, 1);
      setSelectedAnswer(newAnswerIds);
    }
  };

  console.log(questionId);
  console.log(selectedAnswer);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Quiz</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="quiz">
        {showScore ? (
          <ShowScore
            questionId={questionId}
            selectedAnswer={selectedAnswer}
            score={score}
            questions={questions}
          />
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
                        <h3 className="text-danger">
                          Q.{currentQuestion + 1},{" "}
                        </h3>
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
                                  <span className="w-100">
                                    {option.content}
                                  </span>
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
    </>
  );
};

export default Quiz;
