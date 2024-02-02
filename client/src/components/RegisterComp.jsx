import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const registerURL = "http://localhost:8000/auth/register";

function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", password: "" });
  const [error, setError] = useState("");

  const handlerRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(registerURL, user);
      setError("");
      navigate("/");
    } catch (error) {
      setError("Such user wasnt found, please try again !!");
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col bg-cardBlue text-cardText w-1/5">
          <h1 className="flex justify-center text-3xl my-4 font-bold">
            Register your Account
          </h1>
          <span className="mx-2 my-1 font-semibold text-lg">User Name:</span>
          <input
            className="mx-2 border border-black"
            type="text"
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          ></input>

          <span className="mx-2 my-1 font-semibold text-lg">Password:</span>
          <input
            className="mx-2 border border-black"
            type="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          ></input>
          <p className="text-red-500 mx-2 my-2">{error}</p>
          
          <div className="flex justify-center">
          <button
            className=" my-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={handlerRegister}
          >
            Create
          </button></div>
        </div>
      </div>
    </>
  );
}

export default Register;
