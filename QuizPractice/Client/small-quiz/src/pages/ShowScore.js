import React from "react";
import { Link } from "react-router-dom";
import './score.scss'
export const ShowScore = (props) => {
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
