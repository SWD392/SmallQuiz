import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axiosInstance from "../api/axiosInstance";
import { Navbar } from "./Navbar";
import "./list_question.scss";
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
  const handleEdit = (question) => {
    setSelectedQuestion(question);
    setIsPopupOpen(true);
  };

  const handleDelete = async (questionId) => {
    let text = "Do you want to delete this question?";
    if (window.confirm(text) === true) {
      const res = await axiosInstance.put(
        `/admin/delete_question?questionId=${questionId}`
      );
      console.log(res.data);
        

      toast.success('Delete successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });

        window.location.reload()
    }
  };

  const handleCreate = () => {
    setopopupCreate(true);
  };

  const handleSubmitCreate = async (event) => {
    const dataCreate = {
      questionContent: questions,
      answers: [
        {
          content: answer1,
          status: answer === answer1 ? true : false,
        },
        {
          content: answer2,
          status: answer === answer2 ? true : false,
        },
        {
          content: answer3,
          status: answer === answer3 ? true : false,
        },
        {
          content: answer4,
          status: answer === answer4 ? true : false,
        },
      ],
    };

    try {
      await axiosInstance.post(`/admin/create_question`, dataCreate);
    } catch (error) {
      console.error(error);
    }
  };

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
              ...question,
              content: questionContent,
              answers: selectedQuestion.answers.map((item) => ({
                content: item.content,
                status: item.status,
              })),
            };
          } else {
            return question;
          }
        })
      );

      toast.success("Update succesfully", {
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
  

  function formatDate(newDate) {
    const months = {
      0: "January",
      1: "February",
      2: "March",
      3: "April",
      4: "May",
      5: "June",
      6: "July",
      7: "August",
      8: "September",
      9: "October",
      10: "November",
      11: "December",
    };
    const d = new Date();
    const year = d.getFullYear();
    const date = d.getDate();
    const monthName = d.getMonth();
    const formatted = `${date}-${monthName}-${year}`;
    return formatted.toString();
  }

  console.log(info);
  //Pagination
  const itemsPerPage = 10;
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = info.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(info.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % info.length;
    setItemOffset(newOffset);
  };
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  };
  return (
    <>
      <Navbar handleLogout={handleLogout} />
      <div className="main-content">
        <div className="container mt-7">
          <div className="row mt-2">
            <div className="col">
              <div className="card shadow">
                <div className="d-flex justify-content-between card-header border-0">
                  <h3 className="mb-0">Question List</h3>
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
                <div className="table-responsive">
                  <table
                    style={{ margin: "0" }}
                    className="table align-items-center table-flush"
                  >
                    <thead className="thead-light">
                      <tr className="text-left">
                        <th scope="col">ID</th>
                        <th scope="col" className="text-left">
                          Content
                        </th>
                        <th scope="col">Create Date</th>
                        <th scope="col">Update Date</th>
                        <th scope="col" className="text-center">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((item) => (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td style={{ width: "65%" }}>{item.content}</td>
                          <td>{formatDate(item.createdDate)}</td>
                          <td></td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-danger btn mr-2"
                              onClick={() => handleDelete(item.id)}
                            >
                              Delete
                            </button>
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
              {/* <nav className="d-flex justify-content-end mt-2">
                <ul className="pagination pagination-lg">
                  <li className="page-item">
                    <a className="page-link" href="#">
                      Previous
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      1
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      3
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      Next
                    </a>
                  </li>
                </ul>
              </nav> */}
              <nav className="d-flex justify-content-end mt-2">
                <ReactPaginate
                  breakLabel="..."
                  nextLabel="Next >"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={2}
                  marginPagesDisplayed={2}
                  pageCount={pageCount}
                  previousLabel="< Previous"
                  renderOnZeroPageCount={null}
                  containerClassName="pagination"
                  pageClassName="page-num"
                  previousClassName="page-num"
                  nextClassName="page-num"
                  activeClassName="active"
                  pageLinkClassName="page-a"
                  nextLinkClassName="page-a"
                  previousLinkClassName="page-a"
                  breakClassName="page-num"
                  breakLinkClassName="page-a"
                />
              </nav>
            </div>
          </div>
        </div>
      </div>
      {ispopupCreateopen && (
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
                      onChange={(e) => setQuestions(e.target.value)}
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
                      <label>Answer 1</label>
                      <input
                        type="text"
                        name=""
                        className="form-control"
                        onChange={(e) => setAnswer1(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Answer 2</label>
                      <input
                        type="text"
                        name=""
                        className="form-control"
                        onChange={(e) => setAnswer2(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Answer 3</label>
                      <input
                        type="text"
                        name=""
                        className="form-control"
                        onChange={(e) => setAnswer3(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Answer 4</label>
                      <input
                        type="text"
                        name=""
                        className="form-control"
                        onChange={(e) => setAnswer4(e.target.value)}
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
                        onChange={(e) => setAnswer(e.target.value)}
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
      )}
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
                        className="form-control"
                      >
                        {selectedQuestion.answers.map((answer, index) => (
                          <option
                            setIndex={index}
                            value={answer.status}
                            key={index}
                          >
                            {answer.content}
                          </option>
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
