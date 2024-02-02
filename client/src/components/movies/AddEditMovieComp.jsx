import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const URL = "http://localhost:8000/movies";

function AddEditMovie() {
  const navigate = useNavigate();
  const adminUser = useSelector((state) => state.user);
  const { id } = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const [typingErr, setTypingErr] = useState("");
  const [error] = useState("You dont have Permissions for that !!");
  const [movie, setMovie] = useState({
    name: "",
    genres: [],
    image: "",
    premiered: "",
  });

  const getMovie = async () => {
    try {
      setIsEdit(true);
      const { data } = await axios.get(`${URL}/${id}`, {
        headers: { "x-access-token": sessionStorage.getItem("accessToken") },
      });

      //sets date into correct format
      const originalDate = new Date(data.premiered);
      const year = originalDate.getFullYear();
      const month = String(originalDate.getMonth() + 1).padStart(2, "0"); // Months are 0-based
      const day = String(originalDate.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;

      setMovie({ ...data, premiered: formattedDate });
    } catch (err) {
      navigate("/");
    }
  };

  useEffect(() => {
    //if id exists then set movie
    if (!!id) {
      getMovie();
    }
  }, []);

  //navigates to previous page
  const navigateBack = () => {
    navigate(-1);
  };

  const handleGenresChange = (e) => {
    const genresInput = e.target.value;
    const genresArray = genresInput.split(",").map((genre) => genre.trim());
    setMovie({ ...movie, genres: genresArray });
  };

  const handleCreateUpdate = async () => {
    if (
      movie.name.length !== 0 &&
      movie.genres.length !== 0 &&
      movie.image.length !== 0 &&
      movie.premiered.length !== 0
    ) {
      setTypingErr("");
      if (isEdit) {
        try {
          await axios.put(`${URL}/${id}`, movie, {
            headers: { "x-access-token": sessionStorage.getItem("accessToken") },
          });
        } catch (err) {
          navigate("/");
        }
      } else {
        try {
          await axios.post(URL, movie, {
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
      {(isEdit && adminUser.permission.UpdateMovies) ||
      (!isEdit && adminUser.permission.CreateMovies) ? (
        <div className="flex justify-center">
          <div className="flex flex-col h-1/4 w-1/4 bg-cardBlue my-20 text-cardText text-lg font italic">
            <h1 className="flex justify-center text-2xl my-4">
              {isEdit ? "Edit Movie : " + movie.name : "Add New Movie"}
            </h1>
            <span className="mx-2 my-1">Name: </span>
            <input
              className="mx-2 border border-black"
              type="text"
              value={movie.name}
              onChange={(e) => setMovie({ ...movie, name: e.target.value })}
            ></input>

            <span className="mx-2 my-1">Genres: </span>
            <input
              className="mx-2 border border-black"
              type="text"
              value={movie.genres.join(", ")}
              onChange={handleGenresChange}
            ></input>

            <span className="mx-2 my-1">Image url: </span>
            <input
              className="mx-2 border border-black"
              type="text"
              value={movie.image}
              onChange={(e) => setMovie({ ...movie, image: e.target.value })}
            ></input>

            <span className="mx-2 my-1">Date: </span>
            <input
              className="mx-2 border border-black"
              type="date"
              value={movie.premiered}
              onChange={(e) =>
                setMovie({ ...movie, premiered: e.target.value })
              }
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

export default AddEditMovie;
