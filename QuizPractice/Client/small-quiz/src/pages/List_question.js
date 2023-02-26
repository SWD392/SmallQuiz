import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import axiosInstance from "../api/axiosInstance";
import jwt_decode from "jwt-decode";
export default function List_question() {
  const [info, setInfo] = useState([]);
  const [record, setRecord] = useState();
  const token = localStorage.getItem("token");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState("");


  const handleEdit = (question) => {
    setSelectedQuestion(question);
    setIsPopupOpen(true);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const questionId = selectedQuestion.id;
    const questionContent = event.target.elements[0].value;
    const answerContent = event.target.elements[1].value;
    
    const data = {
      content: questionContent,
      answers: [
        {
          content: answerContent,
          isCorrect: true,
        },
      ],
    };
    try {
      axiosInstance.put(
        `/admin/update_question?questionId=${questionId}`,
        data
      );
      setIsPopupOpen(false);
      // setSelectedQuestion(null);
      setInfo((prevInfo) =>
        prevInfo.map((question) => {
          if (question.id === questionId) {
            return { ...question, content: questionContent };
          } else {
            return question;
          }
        })    
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/admin/listQuestions", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setInfo(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [token]);
  // const decode = token ? jwt_decode(token) : null;
  // useEffect(() => {
  //   const fetchInfo = async () => {
  //     const data = {
  //       username: decode.sub,
  //     }
  //     try {
  //       axios.post("http://localhost:8081/info",data).then((response) => {
  //         console.log(response.data);
  //       });
  //     } catch (error) {}
  //   };

  //   fetchInfo();
  // }, []);

  const nagative = useNavigate();

  

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    nagative("/list_question");
  };

  

  
  return (
    <div>
    <div className="main-content">
      <div className="container mt-7">
        <h2 className="mb-5">Question List</h2>
        <div className="row">
          <div className="col">
            <div className="card shadow">
              <div className="card-header border-0">
                <h3 className="mb-0">Question List</h3>
              </div>
              <div className="table-responsive">
                <table className="table align-items-center table-flush">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Content</th>
                      <th scope="col">Create Date</th>
                      <th scope="col">Update Date</th>
                      <th scope="col">Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {info.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.content}</td>
                        <td>{item.createDate}</td>
                        <td></td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-info btn"
                            data-toggle="modal"
                            data-target="#contact-modal"
                            onClick={() => handleEdit(item)}
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
  </div>
 {isPopupOpen && (
  <div>
    <div id="contact"></div>
    <div id="contact-modal" className="modal fade" role="dialog">
      <div className="modal-dialog">
        <div className="modal-content">
          <form id="contactForm" name="contact" role="form" onSubmit={handleSubmit}>
            <div className="modal-header">
              <input
                type="text"
                name="content"
                className="form-control"
                defaultValue={selectedQuestion.content}
                onChange={(e) => setSelectedQuestion({...selectedQuestion, content: e.target.value})}
              />
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
            </div>
            <div className="modal-body">
              {selectedQuestion.answers.map((answer, index) => (
                <div key={index} className="form-group">
                  <label htmlFor={`answer-${index}`}>Answer {index + 1}</label>
                  <input
                    type="text"
                    name={`answer-${index}`}
                    className="form-control"
                    defaultValue={answer.content}
                    onChange={(e) =>
                      setSelectedQuestion({
                        ...selectedQuestion,
                        answers: selectedQuestion.answers.map((a, i) =>
                          i === index ? { ...a, content: e.target.value } : a
                        ),
                      })
                    }
                  />
                </div>
              ))}
              <div className="form-group">
                <label htmlFor="correct-answer">Choose a correct answer:</label>
                <select
                  name="correct-answer"
                  id="correct-answer"
                  className="form-control"
                  value={selectedQuestion.correctAnswer}
                  onChange={(e) => setSelectedQuestion({...selectedQuestion, correctAnswer: e.target.value})}
                >
                  {selectedQuestion.answers.map((answer, index) => (
                    <option key={index} value={index}>
                      Answer {index + 1}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">
                Close
              </button>
              <button type="submit" className="btn btn-success">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
)
}
</div>
  );
}
