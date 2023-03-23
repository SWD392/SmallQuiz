import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {

  const navigate = useNavigate()

  const userid = localStorage.getItem("userid")
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("New password and confirm password do not match");
      return;
    }

    axios
      .post("http://localhost:8081/changePassword", {
        userId: userid,
        oldPassword: currentPassword,
        newPassword: newPassword,
      })
      .then((response) => {
        setMessage(response.data.message);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      })
      .catch((error) => {
        setMessage(error.response.data.message);
      });

      navigate("/")
  };

  return (
    // <div>
    //   <h2>Change Password</h2>
    //   <form onSubmit={handleSubmit}>
    //     <div>
    //       <label htmlFor="current-password">Current Password:</label>
    //       <input
    //         type="password"
    //         id="current-password"
    //         value={currentPassword}
    //         onChange={(event) => setCurrentPassword(event.target.value)}
    //       />
    //     </div>
    //     <div>
    //       <label htmlFor="new-password">New Password:</label>
    //       <input
    //         type="password"
    //         id="new-password"
    //         value={newPassword}
    //         onChange={(event) => setNewPassword(event.target.value)}
    //       />
    //     </div>
    //     <div>
    //       <label htmlFor="confirm-password">Confirm Password:</label>
    //       <input
    //         type="password"
    //         id="confirm-password"
    //         value={confirmPassword}
    //         onChange={(event) => setConfirmPassword(event.target.value)}
    //       />
    //     </div>
    //     <button type="submit">Change Password</button>
    //   </form>
    //   {message && <p>{message}</p>}
    // </div>
<div className="container bootstrap snippets bootdey">
  <div className="row">
    <div className="col-xs-12 col-sm-12 col-md-6 col-md-offset-2">
      <div className="panel panel-info">
        <div className="panel-heading">
          <h3 className="panel-title">
            <span className="glyphicon glyphicon-th" />
            Change password   
          </h3>
        </div>
        <div className="panel-body">
          <div className="row">
            <div className="col-xs-6 col-sm-6 col-md-6 separator social-login-box"> <br />
              <img alt className="img-thumbnail" src="https://bootdey.com/img/Content/avatar/avatar1.png" />                        
            </div>
            <div style={{marginTop: 80}} className="col-xs-6 col-sm-6 col-md-6 login-box">
              <div className="form-group">
                <div className="input-group">
                  <div className="input-group-addon"><span className="glyphicon glyphicon-lock" /></div>
                  <input className="form-control" type="password" placeholder="Current Password" />
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <div className="input-group-addon"><span className="glyphicon glyphicon-log-in" /></div>
                  <input className="form-control" type="password" placeholder="New Password" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="panel-footer">
          <div className="row">
            <div className="col-xs-6 col-sm-6 col-md-6" />
            <div className="col-xs-6 col-sm-6 col-md-6">
              <button className="btn icon-btn-save btn-success" type="submit">
                <span className="btn-save-label"><i className="glyphicon glyphicon-floppy-disk" /></span>save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default ChangePassword;
