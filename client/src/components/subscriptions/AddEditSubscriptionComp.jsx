import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const URL = "/members";


function AddEditSub() {
  const navigate = useNavigate();
  const adminUser = useSelector((state) => state.user);
  const [typingErr, setTypingErr] = useState("");
  const [error] = useState("You dont have Permissions for that !!");
  const { id } = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const [member, setMember] = useState({
    name: "",
    email: "",
    city: "",
  });

  useEffect(() => {
    const getMember = async () => {
      try {
        setIsEdit(true);
        const { data } = await axios.get(`${URL}/${id}`, {
          headers: { "x-access-token": sessionStorage.getItem("accessToken") },
        });
        setMember(data);
      } catch (err) {
        navigate("/");
      }
    };

    //if id exists then set movie
    if (!!id) {
      getMember();
    }
  }, []);

  //navigates to previous page
  const navigateBack = () => {
    navigate(-1);
  };

  const handleCreateUpdate = async () => {
    if (
      member.name.length !== 0 &&
      member.city.length !== 0 &&
      member.email.length !== 0
    ) {
      if (isEdit) {
        try {
          await axios.put(`${URL}/${id}`, member, {
            headers: { "x-access-token": sessionStorage.getItem("accessToken") },
          });
        } catch (err) {
          navigate("/");
        }
      } else {
        try {
          await axios.post(URL, member, {
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

  return (
    <>
      {(isEdit && adminUser.permission.UpdateSubscriptions) ||
      (!isEdit && adminUser.permission.CreateSubscriptions) ? (
        <div className="flex justify-center">
          <div className="flex flex-col h-1/4 w-1/4 bg-cardBlue my-20 text-cardText text-lg font italic">
            <h1 className="flex justify-center text-2xl my-4">
              {isEdit ? "Edit Member : " + member.name : "Add New Member"}
            </h1>
            <span className="mx-2 my-1">Name: </span>
            <input
              className="mx-2 border border-black"
              type="text"
              value={member.name}
              onChange={(e) => setMember({ ...member, name: e.target.value })}
            ></input>

            <span className="mx-2 my-1">Email: </span>
            <input
              className="mx-2 border border-black"
              type="text"
              value={member.email}
              onChange={(e) => setMember({ ...member, email: e.target.value })}
            ></input>

            <span className="mx-2 my-1">City: </span>
            <input
              className="mx-2 border border-black"
              type="text"
              value={member.city}
              onChange={(e) => setMember({ ...member, city: e.target.value })}
            ></input>

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

export default AddEditSub;
