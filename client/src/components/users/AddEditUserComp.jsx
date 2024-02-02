import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const URL = "http://localhost:8000/users";


function AddEditUsers() {
  const navigate = useNavigate();
  const adminUser = useSelector((state) => state.user);
  const { id } = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const [viewSubs, setViewSubs] = useState(false);
  const [viewMovies, setViewMovies] = useState(false);
  const [typingErr, setTypingErr] = useState("");
  const [error] = useState("You dont have Permissions for that !!");
  const [user, setUser] = useState({
    _id: "",
    firstName: "",
    lastName: "",
    createdDate: "",
    sessionTimeOut: "",
    permission: {
      ViewSubscriptions: false,
      CreateSubscriptions: false,
      DeleteSubscriptions: false,
      UpdateSubscriptions: false,
      ViewMovies: false,
      CreateMovies: false,
      DeleteMovies: false,
      UpdateMovies: false,
    },
    userName: "",
  });

  useEffect(() => {
    const getUser = async () => {
      try {
        setIsEdit(true);
        const { data } = await axios.get(`${URL}/${id}`, {
          headers: { "x-access-token": sessionStorage.getItem("accessToken") },
        });
        setUser(data);
        setViewMovies(data.permission.ViewMovies);
        setViewSubs(data.permission.ViewSubscriptions);
      } catch (err) {
        navigate("/");
      }
    };

    //if id exists then set user
    if (!!id) {
      getUser();
    } else {
      setUser({ ...user, createdDate: getDate() });
    }
  }, []);

  //navigates to previous page
  const navigateBack = () => {
    navigate(-1);
  };

  const handleCreateUpdate = async () => {
    if (
      user.firstName.length !== 0 &&
      user.lastName.length !== 0 &&
      user.createdDate.length !== 0 &&
      user.sessionTimeOut.length !== 0
    ) {
      if (isEdit) {
        try {
          await axios.put(`${URL}/${id}`, user, {
            headers: { "x-access-token": sessionStorage.getItem("accessToken") },
          });
        } catch (err) {
          navigate("/");
        }
      } else {
        try {
          await axios.post(URL, user, {
            headers: { "x-access-token": sessionStorage.getItem("accessToken") },
          });
        } catch (err) {
          navigate("/");
        }
      }
      navigateBack();
    } else {
      setTypingErr("Missing one of the fields .Please fill all the inputs.");
    }
  };

  function getDate() {
    const currentDate = new Date();

    const day = currentDate.getDate().toString().padStart(2, "0");
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const year = currentDate.getFullYear();

    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  }

  return (
    <>
      {adminUser.userName.toLowerCase() === "admin@gmail.com" ? (
        <div className="flex justify-center">
          <div className="flex flex-col h-1/4 w-1/4 bg-cardBlue my-20 text-cardText text-lg font italic">
            <h1 className="flex justify-center text-2xl my-4">
              {isEdit
                ? "Edit User : " + user.firstName + " " + user.lastName
                : "Add New User"}
            </h1>
            <span className="mx-2 my-1">First Name: </span>
            <input
              className="mx-2 border border-black"
              type="text"
              value={user.firstName}
              onChange={(e) => setUser({ ...user, firstName: e.target.value })}
            ></input>

            <span className="mx-2 my-1">Last Name: </span>
            <input
              className="mx-2 border border-black"
              type="text"
              value={user.lastName}
              onChange={(e) => setUser({ ...user, lastName: e.target.value })}
            ></input>

            <span className="mx-2 my-1">User Name: </span>
            <input
              className="mx-2 border border-black"
              type="text"
              value={user.userName}
              onChange={(e) => setUser({ ...user, userName: e.target.value })}
            ></input>

            <span className="mx-2 my-1">Session time out(Minutes): </span>
            <input
              className="mx-2 border border-black"
              type="number"
              value={user.sessionTimeOut}
              onChange={(e) =>
                setUser({
                  ...user,
                  sessionTimeOut: e.target.value,
                })
              }
            ></input>

            <span className="mx-2 my-2">Created data: {user.createdDate}</span>

            <span className="mx-2 font-semibold underline">permissions:</span>
            <div className="flex space-x-2 mx-2">
              <input
                type="checkbox"
                id="ViewSubscriptions"
                checked={viewSubs}
                onChange={(e) => {
                  if (
                    !user.permission.CreateSubscriptions &&
                    !user.permission.DeleteSubscriptions &&
                    !user.permission.UpdateSubscriptions
                  ) {
                    setViewSubs(e.target.checked);
                    setUser((prevUser) => ({
                      ...prevUser,
                      permission: {
                        ...prevUser.permission,
                        ViewSubscriptions: e.target.checked,
                      },
                    }));
                  }
                }}
              ></input>
              <label htmlFor="ViewSubscriptions">View Subscriptions</label>
            </div>

            <div className="flex space-x-2 mx-2">
              <input
                type="checkbox"
                id="CreateSubscriptions"
                checked={user.permission.CreateSubscriptions}
                onChange={(e) => {
                  setUser((prevUser) => ({
                    ...prevUser,
                    permission: {
                      ...prevUser.permission,
                      CreateSubscriptions: e.target.checked,
                      ViewSubscriptions:
                        e.target.checked ||
                        prevUser.permission.ViewSubscriptions,
                    },
                  }));
                  if (!user.permission.CreateSubscriptions) setViewSubs(true);
                }}
              ></input>
              <label htmlFor="CreateSubscriptions">Create Subscriptions</label>
            </div>

            <div className="flex space-x-2 mx-2">
              <input
                type="checkbox"
                id="DeleteSubscriptions"
                checked={user.permission.DeleteSubscriptions}
                onChange={(e) => {
                  setUser((prevUser) => ({
                    ...prevUser,
                    permission: {
                      ...prevUser.permission,
                      DeleteSubscriptions: e.target.checked,
                      ViewSubscriptions:
                        e.target.checked ||
                        prevUser.permission.ViewSubscriptions,
                    },
                  }));
                  if (!user.permission.DeleteSubscriptions) setViewSubs(true);
                }}
              ></input>
              <label htmlFor="DeleteSubscriptions">Delete Subscriptions</label>
            </div>

            <div className="flex space-x-2 mx-2">
              <input
                type="checkbox"
                id="UpdateSubscriptions"
                checked={user.permission.UpdateSubscriptions}
                onChange={(e) => {
                  setUser((prevUser) => ({
                    ...prevUser,
                    permission: {
                      ...prevUser.permission,
                      UpdateSubscriptions: e.target.checked,
                      ViewSubscriptions:
                        e.target.checked ||
                        prevUser.permission.ViewSubscriptions,
                    },
                  }));
                  if (!user.permission.UpdateSubscriptions) setViewSubs(true);
                }}
              ></input>
              <label htmlFor="UpdateSubscriptions">Update Subscriptions</label>
            </div>

            <div className="flex space-x-2 mx-2">
              <input
                type="checkbox"
                id="ViewMovies"
                checked={viewMovies}
                onChange={(e) => {
                  if (
                    !user.permission.CreateMovies &&
                    !user.permission.DeleteMovies &&
                    !user.permission.UpdateMovies
                  ) {
                    setViewMovies(e.target.checked);
                    setUser((prevUser) => ({
                      ...prevUser,
                      permission: {
                        ...prevUser.permission,
                        ViewMovies: e.target.checked,
                      },
                    }));
                  }
                }}
              ></input>
              <label htmlFor="ViewMovies">View Movies</label>
            </div>

            <div className="flex space-x-2 mx-2">
              <input
                type="checkbox"
                id="CreateMovies"
                checked={user.permission.CreateMovies}
                onChange={(e) => {
                  setUser((prevUser) => ({
                    ...prevUser,
                    permission: {
                      ...prevUser.permission,
                      CreateMovies: e.target.checked,
                      ViewMovies:
                        e.target.checked || prevUser.permission.ViewMovies,
                    },
                  }));
                  if (!user.permission.CreateMovies) setViewMovies(true);
                }}
              ></input>
              <label htmlFor="CreateMovies">Create Movies</label>
            </div>

            <div className="flex space-x-2 mx-2">
              <input
                type="checkbox"
                id="DeleteMovies"
                checked={user.permission.DeleteMovies}
                onChange={(e) => {
                  setUser((prevUser) => ({
                    ...prevUser,
                    permission: {
                      ...prevUser.permission,
                      DeleteMovies: e.target.checked,
                      ViewMovies:
                        e.target.checked || prevUser.permission.ViewMovies,
                    },
                  }));
                  if (!user.permission.DeleteMovies) setViewMovies(true);
                }}
              ></input>
              <label htmlFor="DeleteMovies">Delete Movies</label>
            </div>

            <div className="flex space-x-2 mx-2">
              <input
                type="checkbox"
                id="UpdateMovies"
                checked={user.permission.UpdateMovies}
                onChange={(e) => {
                  setUser((prevUser) => ({
                    ...prevUser,
                    permission: {
                      ...prevUser.permission,
                      UpdateMovies: e.target.checked,
                      ViewMovies:
                        e.target.checked || prevUser.permission.ViewMovies,
                    },
                  }));
                  if (!user.permission.UpdateMovies) setViewMovies(true);
                }}
              ></input>
              <label htmlFor="UpdateMovies">Update Movies</label>
            </div>
            <span className="my-4 mx-4 text-red-500">{typingErr}</span>

            <button
              className="py-1 w-6/7 my-4 mx-6 font-bold bottom-16 text-cardBlue text-2xl cursor-pointer tracking-wider bg-deepPurple hover:bg-indigo-700 transition ease-out duration-500 "
              onClick={handleCreateUpdate}
            >
              {isEdit ? "update" : "add"}
            </button>
            <button
              className="py-1 w-6/7 mx-6 mb-4 font-bold bottom-6 text-cardBlue text-2xl cursor-pointer tracking-wider bg-red-500 hover:bg-red-400 transition ease-out duration-500 "
              onClick={navigateBack}
            >
              cancel
            </button>
          </div>
        </div>
      ) : (
        <div>{error}</div>
      )}
    </>
  );
}

export default AddEditUsers;
