import { Link } from "react-router-dom";
import { useState } from "react";
import NewMovie from "./NewMovieComp";

function Movies({ subMovies, movies, addSub }) {
  const [showNewMovie, setShowNewMovie] = useState(false);

  const converDate = (date) => {
    const dateObject = new Date(date);

    // Extract year, month, and day components
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const day = dateObject.getDate().toString().padStart(2, "0");
    // Create the desired output string
    return `${day}-${month}-${year}`;
  };
  return (
    <>
      <div className="flex flex-col">
        {subMovies.length !== 0 && (
          <h2 className="flex justify-center font-semibold underline">
            Movies Subscribed
          </h2>
        )}

        <ul className="list-disc pl-10 italic">
          {subMovies.map((movie) => {
            return (
              <li key={movie.movieId}>
                <Link to={"/home/movies/all"} state={{ filter: movie.movieName }}>
                  {movie.movieName}
                </Link>
                , {converDate(movie.subscriptionDate)}
              </li>
            );
          })}
        </ul>

        <button
          className="flex justify-center items-center space-x-1 underline font-medium"
          onClick={() => setShowNewMovie(!showNewMovie)}
        >
          <span>Subscribe to new movie</span>
          <svg
            className="w-4 h-4 pt-1"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>
          <div className="h-32">

 
        {showNewMovie && (
          <NewMovie
            subMovies={subMovies}
            movies={movies}
            addSub={addSub}
          ></NewMovie>
          
        )}</div>
      </div>
    </>
  );
}

export default Movies;
