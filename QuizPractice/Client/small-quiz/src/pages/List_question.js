import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axiosInstance from "../api/axiosInstance";
import { Navbar } from "./Navbar";
export default function List_question() {
  const [info, setInfo] = useState([]);
  const token = localStorage.getItem("token");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [ispopupCreateopen, setopopupCreate] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [answer1, setAnswer1] = useState("");
  const [answer, setAnswer] = useState();
  const [answer2, setAnswer2] = useState("");
  const [answer3, setAnswer3] = useState("");
  const [answer4, setAnswer4] = useState("");
  const [questions, setQuestions] = useState("");
  const [index, setIndex] = useState(0);
  const handleEdit = (question) => {
    setSelectedQuestion(question);
    setIsPopupOpen(true);
  };
  const handleCreate = () => {
    setopopupCreate(true);
  }

  const handleSubmitCreate = async (event) => {
    const dataCreate = {
      questionContent: questions,
      answers: [
        {
          content: answer1,
          status: answer === answer1 ? true : false
        },
        {
          content: answer2,
          status: answer === answer2 ? true : false
        },
        {
          content: answer3,
          status: answer === answer3 ? true : false
        },
        {
          content: answer4,
          status: answer === answer4 ? true : false
        },
      ]
    }


    try {
      const res = await axiosInstance.post(
        `/admin/create_question`,
        dataCreate
      );
    } catch (error) {
      console.error(error);
    }

  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const questionId = selectedQuestion.id;
    const questionContent = event.target.elements[0].value;

    const data = {
      questionContent: questionContent,
      answers: selectedQuestion.answers.map((item) => ({
        content: item.content,
        status: item.status,
      })),
    };



    try {
      await axiosInstance.put(
        `/admin/update_question?questionId=${questionId}`,
        data
      );
      setInfo((prevInfo) =>
        prevInfo.map((question) => {
          if (question.id === questionId) {
            return {
              ...question, content: questionContent, answers: selectedQuestion.answers.map((item) => ({
                content: item.content,
                status: item.status,
              }))
            };
          } else {
            return question;
          }
        })
      );
      
      toast.success('Update succesfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      
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
  const nagative = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    nagative("/list_question");
  };

  console.log(answer);
  return (
    <>
      <Navbar></Navbar>
      <div className="main-content">
        <div className="container mt-7">
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
              <button
                type="button"
                className="btn btn-success btn"
                data-toggle="modal"
                data-target="#contact-modal"
                onClick={() => handleCreate()}
              >
                Create new Question
              </button>
            </div>
          </div>
        </div>
      </div>
      {
        ispopupCreateopen && (
          <div>
            <div id="contact-modal" className="modal" role="dialog">
              <div className="modal-dialog">
                <div className="modal-content">
                  <form
                    id="contactForm"
                    name="contact"
                    role="form"
                    onSubmit={handleSubmitCreate}
                  >
                    <div className="modal-header">
                      <input
                        type="text"
                        name="content"
                        className="form-control"

                        onChange={(e) =>
                          setQuestions(e.target.value)
                        }
                      />
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                      >
                        &times;
                      </button>
                    </div>
                    <div className="modal-body">
                      <div className="form-group">
                        <label>
                          Answer 1
                        </label>
                        <input
                          type="text"
                          name=""
                          className="form-control"
                          onChange={(e) =>
                            setAnswer1(e.target.value)
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label>
                          Answer 2
                        </label>
                        <input
                          type="text"
                          name=""
                          className="form-control"
                          onChange={(e) =>
                            setAnswer2(e.target.value)
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label>
                          Answer 3
                        </label>
                        <input
                          type="text"
                          name=""
                          className="form-control"
                          onChange={(e) =>
                            setAnswer3(e.target.value)
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label>
                          Answer 4
                        </label>
                        <input
                          type="text"
                          name=""
                          className="form-control"
                          onChange={(e) =>
                            setAnswer4(e.target.value)
                          }
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="correct-answer">
                          Choose a correct answer:
                        </label>
                        <select
                          name="correct-answer"
                          id="correct-answer"
                          value={answer}
                          onChange={((e) => setAnswer(e.target.value))}
                          className="form-control"
                        >
                          <option value={answer1}>Answer 1</option>
                          <option value={answer2}>Answer 2</option>
                          <option value={answer3}>Answer 3</option>
                          <option value={answer4}>Answer 4</option>
                        </select>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-default"
                        data-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        type="submit"
                        className="btn btn-success"
                        data-toggle="modal"
                        data-target="#contact-modal"
                      >
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
      {isPopupOpen && (
        <div>
          <div id="contact-modal" className="modal" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <form
                  id="contactForm"
                  name="contact"
                  role="form"
                  onSubmit={handleSubmit}
                >
                  <div className="modal-header">
                    <input
                      type="text"
                      name="content"
                      className="form-control"
                      value={selectedQuestion.content}
                      onChange={(e) =>
                        setSelectedQuestion({
                          ...selectedQuestion,
                          content: e.target.value,
                        })
                      }
                    />
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                    >
                      &times;
                    </button>
                  </div>
                  <div className="modal-body">
                    {selectedQuestion.answers.map((answer, index) => (
                      <div key={index} className="form-group">
                        <label htmlFor={`answer-${index}`}>
                          Answer {index + 1}
                        </label>
                        <input
                          type="text"
                          name={`answer-${index}`}
                          className="form-control"
                          value={answer.content}
                          onChange={(e) =>
                            setSelectedQuestion({
                              ...selectedQuestion,
                              answers: selectedQuestion.answers.map((a, i) =>
                                i === index
                                  ? { ...a, content: e.target.value }
                                  : a
                              ),
                            })
                          }
                        />
                      </div>
                    ))}
                    <div className="form-group">
                      <label htmlFor="correct-answer">
                        Choose a correct answer:
                      </label>
                      <select
                        name="correct-answer"
                        id="correct-answer"
                        value={selectedQuestion.answers[index].content}
                        className="form-control"
                      >
                        {selectedQuestion.answers.map((answer, index) => (
                          <option setIndex={index} value={answer.status} key={index}>{answer.content}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-default"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      className="btn btn-success"
                      data-toggle="modal"
                      data-target="#contact-modal"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <ToastContainer />
        </div>
        

      )}

    </>
  );
}

