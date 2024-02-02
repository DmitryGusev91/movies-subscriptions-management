import Movies from "./MoviesSubscribedComp";
import { useNavigate } from "react-router-dom";

function Sub({ sub, deleteSubs, movies, addMovie, permission }) {
  const navigate = useNavigate();

  const handlerDeleteMember = () => {
    deleteSubs(sub._id);
  };

  const addSub = (movieId, date) => {
    addMovie(movieId, sub._id, date);
  };

  return (
    <>
      <div className="flex flex-col bg-cardBlue text-deepPurple rounded text-lg">
        <h2 className="flex justify-center text-2xl font-bold underline">{sub.name}</h2>

        <div className="flex my-1 mx-2 space-x-2">
          <span className="font-semibold">Email : </span>
          <span> {sub.email}</span>
        </div>

        <div className="flex my-1 mx-2  space-x-2">
          <span className="font-semibold">City : </span>
          <span>{sub.city}</span>
        </div>

        {permission.UpdateSubscriptions && (
          <button
            className="py-1 w-6/7 my-4 mx-6 font-bold bottom-16 text-cardBlue text-2xl cursor-pointer tracking-wider bg-deepPurple hover:bg-indigo-700 transition ease-out duration-500 "
            onClick={() => navigate(`/home/subscriptions/${sub._id}`)}
          >
            Edit
          </button>
        )}
        {permission.DeleteSubscriptions && (
          <button
            className="py-1 w-6/7 mx-6 mb-4 font-bold bottom-6 text-cardBlue text-2xl cursor-pointer tracking-wider bg-red-500 hover:bg-red-400 transition ease-out duration-500 "
            onClick={handlerDeleteMember}
          >
            Delete
          </button>
        )}
        
        <Movies subMovies={sub.movies} movies={movies} addSub={addSub}></Movies>

        
      </div>
    </>
  );
}

export default Sub;
