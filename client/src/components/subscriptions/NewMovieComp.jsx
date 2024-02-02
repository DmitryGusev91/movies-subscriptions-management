import { useState, useEffect } from "react";

function NewMovie({ movies, subMovies, addSub }) {
  const [newMovies, setNewMovies] = useState([]);
  const [movie, setMovie] = useState({ movieId: "", date: "" });

  useEffect(() => {
    //init the select options with movies that werent seen yet
    const initMovies = () => {
      const userMovieIds = subMovies.map((movie) => movie.movieId);
      const remainingMovies = movies.filter(
        (movie) => !userMovieIds.includes(movie.movieId)
      );
      setNewMovies(remainingMovies);
    };
    initMovies();
  }, [subMovies]);

  //if the movie and date inputs arent default then send it to previous component
  const handlSubmit = (e) => {
    e.preventDefault();
    if (movie.movieId && movie.date) {
      addSub(movie.movieId, movie.date);
      setMovie({ movieId: "", date: "" });
    }
  };

  return (
    <>
      <div>
        <form className="flex flex-col" onSubmit={(e) => handlSubmit(e)}>
          <div className="flex space-x-2 my-1 mx-2">
            <label className="font-semibold" htmlFor="movies">
              Movie name :
            </label>
            <select
              className="mx-2 border border-black"
              name="movies"
              id="movies"
              onChange={(e) => setMovie({ ...movie, movieId: e.target.value })}
              defaultValue={""}
            >
              <option value={""}></option>
              {newMovies.map((m) => {
                return (
                  <option key={m.movieId} value={m.movieId}>
                    {m.movieName}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex space-x-20 my-1 mx-2">
            <span className="font-semibold">Date :</span>
            <input
              className="mx-2 border border-black"
              type="date"
              value={movie.date}
              onChange={(e) => setMovie({ ...movie, date: e.target.value })}
            ></input>
          </div>

          <div className="flex justify-center items-center mt-2">
            <button
              className="border border-black bg-yellow-500 px-2"
              type="submit"
            >
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default NewMovie;
