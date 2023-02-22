import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const HelloUser = () => {
    const [info, setInfo] = useState();
    const [record, setRecord] = useState();
    const token = localStorage.getItem("token");
  
    // useEffect(() => {
    //   axios.get("http://localhost:8081/admin/listQuestions").then((res) => {
    //     setInfo(res.data);
    //   });
    // }, []);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            "http://localhost:8081/user",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
  
          console.log(response);
        } catch (error) {}
      };
  
      fetchData();
    }, []);
    const nagative = useNavigate();
  
     

  return (
    <div>  
         <div>HelloUser</div>
    </div>
  )
}
