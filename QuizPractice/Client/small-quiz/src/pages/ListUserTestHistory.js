import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { getTestHistory } from "../service/requestAPI";
import "./listUserTestHistory.scss";
import { Navbar } from "./Navbar";
export const ListUserTestHistory = () => {
  const [testHistory, setTestHistory] = useState([]);
  const userid = localStorage.getItem("userid");
  useEffect(() => {
    const fetchTest = async () => {
      try {
        const testHistory = await getTestHistory(userid);
        setTestHistory(testHistory)
      } catch (error) {}
    };

    fetchTest();
  }, []);

  function formatDate(newDate) {
    const d = new Date();
    const year = d.getFullYear();
    const date = d.getDate();
    const monthName = d.getMonth();
    const formatted = `${date}-${monthName}-${year}`;
    return formatted.toString();
  }

  const isTested = testHistory.length === 0

  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Test History</title>
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
            {
              isTested ? (
                <p>You haven't done any quiz yet</p>
              ):
              (
                <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Test</th>
                  <th>Date Created</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {testHistory.map((item, index) => (
                  <tr>
                    <td>{item.id}</td>
                    <td>
                      Test {index + 1}
                    </td>
                    <td>{formatDate(item.createdDate)}</td>
                    <td>
                      <Link to={`/useranswer/${item.id}`} type="button" className="btn btn-primary btn">
                        View Detail
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
              )
            }
          </div>
        </div>
      </div>
    </>
  );
};
