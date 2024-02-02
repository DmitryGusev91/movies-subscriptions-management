import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function User({ user, deleteUser }) {
  const [permissions, setPermissions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const newPermArr = convertObjectToArray(user.permission);
    setPermissions(newPermArr);
  }, []);

  function convertObjectToArray(obj) {
    return Object.keys(obj)
      .filter((key) => obj[key]) // Filter keys with true values
      .map((key) => {
        // Replace camelCase with space-separated words
        const words = key.replace(/([a-z])([A-Z])/g, "$1 $2");
        // Capitalize the first letter of each word
        return words
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
      });
  }

  const handlerDeleteUser = () => {
    deleteUser(user._id);
  };

  return (
    <>
      <div className="flex flex-col border border-black w-1/2 bg-cardBlue text-deepPurple text-2xl">
        <div className="flex justify-center my-1 text-4xl font-bold text-deepPurple underline">
          <span>{user.firstName + " " + user.lastName}</span>
        </div>

        <div className="flex space-x-2 mx-2 my-1">
          <span className="font-semibold">User Name: </span>
          <span>{user.userName}</span>
        </div>

        <div className="flex space-x-2 mx-2 my-1">
          <span className="font-semibold">Session time out(Minutes): </span>{" "}
          <span>{user.sessionTimeOut}</span>
        </div>

        <div className="flex space-x-2 mx-2 my-1">
          <span className="font-semibold">Created date: </span>{" "}
          <span>{user.createdDate}</span>
        </div>

        <div className="flex space-x-2 mx-2 my-1">
          <span className="font-semibold">Permissions:</span>
          <span>
            {permissions
              .map((permission) =>
                permission
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")
              )
              .join(", ")}
          </span>
        </div>

        <button
          className="py-1 w-6/7 my-4 mx-6 font-bold bottom-16 text-cardBlue text-2xl cursor-pointer tracking-wider bg-deepPurple hover:bg-indigo-700 transition ease-out duration-500 "
          onClick={() => navigate(`/home/users/${user._id}`)}
        >
          Edit
        </button>
        <button
          className="py-1 w-6/7 mx-6 mb-4 font-bold bottom-6 text-cardBlue text-2xl cursor-pointer tracking-wider bg-red-500 hover:bg-red-400 transition ease-out duration-500 "
          onClick={handlerDeleteUser}
        >
          Delete
        </button>
      </div>

      <br></br>
    </>
  );
}

export default User;
