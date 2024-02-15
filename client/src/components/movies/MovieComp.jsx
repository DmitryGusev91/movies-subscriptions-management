import MovieMembers from "./MovieMembersComp";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const URL = "/movies";

function Movie({ movie, deleteMovie, permission }) {
  const navigate = useNavigate();

  const handlerDeleteMovie = async () => {
    try {
      await axios.delete(`${URL}/${movie.movieId}`, {
        headers: { "x-access-token": sessionStorage.getItem("accessToken") },
      });
    } catch (err) {
      navigate("/");
    }
    deleteMovie(movie.movieId);
  };
  return (
    <>
      <div className="w-[300px] h-[420px] bg-transparent cursor-pointer group perspective">
        <div className="relative preserve-3d group-hover:my-rotate-y-180 w-full h-full duration-1000">
          <div className="absolute backface-hidden border-2 w-full h-full">
            <img
              className="h-full w-full"
              src={movie.image}
              alt="Movie Poster"
            />
          </div>
          <div className="absolute my-rotate-y-180 backface-hidden w-full h-full bg-cardBlue">
            <div className="text-cardText flex flex-col h-full">
              <h2 className="text-3xl font-semibold">
                {movie.movieName + ", " + movie.premieredDate.substring(0, 4)}
              </h2>
              <div className="flex flex-column">
                <span className="text-xl font-semibold">genres:</span>
                {/*prints the genres of the move, puts it between "" and adds a , unless it is the last genre*/}
                <span className="ml-2 text-lg">
                  {movie.movieGenres.map(
                    (g, index, array) =>
                      `${g}${index < array.length - 1 ? ", " : ""}`
                  )}
                </span>
              </div>

              <MovieMembers
                members={movie.members}
                permission={permission}
              ></MovieMembers>
              {permission.UpdateMovies && (
                <button
                  className="py-1 w-5/6 my-4 mx-6 font-bold absolute bottom-16 text-cardBlue text-2xl cursor-pointer tracking-wider bg-deepPurple hover:bg-indigo-700 transition ease-out duration-500 "
                  onClick={() => navigate(`/home/movies/${movie.movieId}`)}
                >
                  Edit
                </button>
              )}
              {permission.DeleteMovies && (
                <button
                  className="py-1 w-5/6 mx-6 font-bold absolute bottom-6 text-cardBlue text-2xl cursor-pointer tracking-wider bg-red-500 hover:bg-red-400 transition ease-out duration-500 "
                  onClick={handlerDeleteMovie}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Movie;
