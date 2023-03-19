import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { Navbar } from "./Navbar";

export const UserAnswer = () => {
  const { testId } = useParams();
  const [userAnswer, setUserAnswer] = useState([]);
  useEffect(() => {
    const fetchTest = async () => {
      try {
        axiosInstance.get(`/user-answers/${testId}`).then((response) => {
          setUserAnswer(response.data);
        });
      } catch (error) {}
    };

    fetchTest();
  }, []);


  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>User Answer</title>
        <link rel="canonical" href="http://mysite.com/example" />
  </Helmet>
    <Navbar />
    <div className="container-xl">
      <div className="table-responsive">
        <div className="table-wrapper">
          <div className="table-title">
            <div className="row">
              <div className="col-sm-5">
                <h2>
                  User <b>Test History</b>
                </h2>
              </div>
            </div>
          </div>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th style={{width: '40%'}}>Question</th>
                <th style={{width: '30%'}}>Correct Answer</th>
                <th style={{width: '30%'}}>User Answer</th>
              </tr>
            </thead>
            <tbody>
              {userAnswer.map((item, index) => (
                <tr>
                  <td style={{width: '40%'}}>{item?.question?.content}</td>
                  <td style={{width: '30%'}}>
                    {item?.answers?.map((answer) => {
                      if (answer?.status === true) {
                        return answer.content;
                      }
                    })}
                  </td>
                  <td style={{width: '30%'}}>{item?.userAnswer?.content}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
  );
};
