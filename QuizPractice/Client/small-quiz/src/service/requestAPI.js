import axios from "axios";


const baseUrl = "http://localhost:8081";

const fetchLogin = async (data) => {
  return await axios.get(baseUrl + "/people", data);
  
};

export { 
    fetchLogin
  
  };