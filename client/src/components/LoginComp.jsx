import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
const loginURL = "/auth/login";
const userURL = "/users";
function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", password: "" });
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handlerLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(loginURL, user);

      sessionStorage.setItem("userName", user.name);
      sessionStorage.setItem("accessToken", data.accessToken);
      sessionStorage.setItem("id", data.id);

      const { data: userInfo } = await axios.get(`${userURL}/${data.id}`, {
        headers: { "x-access-token": sessionStorage.getItem("accessToken") },
      });

      dispatch({ type: "ADD_USER", payload: userInfo });
      setError("");
      console.log("accessToken got in login "+sessionStorage.getItem("accessToken"))
      navigate("/home");
    } catch (error) {
      setError("Such user wasnt found, please try again !!");
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col bg-cardBlue text-cardText w-1/5">
          <h1 className="flex justify-center text-3xl my-4 font-bold">Login</h1>
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
          <p className="mx-2 mt-1 italic">User Name: admin@gmail.com</p>
          <p className="mx-2 mb-1 italic"> Password: admin</p>
          <p className="text-red-500 mx-2 my-2">{error}</p>
          <div className="flex justify-center">
            <button
              className="my-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={handlerLogin}
            >
              Login
            </button>
          </div>

          <div className="flex space-x-2 mx-2 my-4">
            <span>New User?</span>
            <Link
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              to={"/register"}
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
