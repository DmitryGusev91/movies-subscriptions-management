import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import User from "./UserComp";
import { useNavigate } from "react-router-dom";

const usersUrl = "http://localhost:8000/users";


function AllUsers() {
  const [users, setUsers] = useState([]);
  const adminUser = useSelector((state) => state.user);
const navigate=useNavigate();

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const { data } = await axios.get(usersUrl, {
          headers: { "x-access-token": sessionStorage.getItem("accessToken") },
        });
        setUsers(data);
      } catch (err) {
        navigate("/");
      }
    };

    getAllUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
      setUsers(users.filter((u) => u._id !== id));
      await axios.delete(`${usersUrl}/${id}`, {
        headers: { "x-access-token": sessionStorage.getItem("accessToken") },
      });
    } catch (err) {
      navigate("/");
    }
  };

  return (
    <>
      {adminUser.userName.toLowerCase() === "admin@gmail.com" && (
        <div className="flex flex-col items-center space-y-4 mt-14">
          {users.map((user) => {
            if (user.userName !== adminUser.userName)
              return (
                <User key={user._id} user={user} deleteUser={deleteUser}></User>
              );
          })}
        </div>
      )}
      {adminUser.userName.toLowerCase() !== "admin@gmail.com" && (
        <div>Dont have Permission!!!</div>
      )}
    </>
  );
}

export default AllUsers;
