
import React from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import './score.scss'
export const ShowScore = (props) => {

  <Helmet>
        <meta charSet="utf-8" />
        <title>Show Score</title>
        <link rel="canonical" href="http://mysite.com/example" />
  </Helmet>

  const userid = localStorage.getItem("userid");
  useEffect(() => {
    const fetchQuestion = async () => {
      const data = props.questionId.map((qid, index) => ({
        questionId: qid,
        userAnswerId: props.selectedAnswer[index]
      }));
      try {
        axiosInstance.post(`http://localhost:8081/getResult?userId=${userid}`, data).then((response) => {
          console.log(response.data);
        });
      } catch (error) {}
    };

    fetchQuestion();
  }, []);

  return (
    <div className="contain">
      <div className="congrats">
        <h1 style={{ marginTop: "25px" }}>
          Congrat<span className="hide">ulation</span>s !
        </h1>
        <div className="done">
          <img src="https://img.icons8.com/bubbles/200/000000/trophy.png" />
        </div>
        <div>
          <p style={{fontSize: '18px'}}>You have {props.score} out of 10</p>
        </div>
        <Link
          className="btn btn-primary border-success align-items-center btn-success mb-5 mt-2"
          type="button"
          to='/home'
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};
