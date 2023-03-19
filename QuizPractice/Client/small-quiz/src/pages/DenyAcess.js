import React from "react";
import { useNavigate } from "react-router-dom";
import './deny.scss';
export const DenyAcess = () => {
  const nagative = useNavigate();
  const handleBack = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userid");
    nagative("/");
  };
  return (
    <div class="text-wrapper">
      <div class="title" data-content="404">
        403 - ACCESS DENIED
      </div>

      <div class="subtitle">
        Oops, You don't have permission to access this page.
      </div>

      <div class="buttons">
        <p onClick={handleBack} style={{margin: '0', cursor: "pointer"}} class="button" href="https://www.brodroid.com">
          Go to homepage
        </p>
      </div>
    </div>
  );
};
