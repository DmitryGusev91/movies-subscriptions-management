import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Movie from "./MovieComp";

const moviesUrl = "/subscriptions/movies";

function AllMovies() {
  const [movies, setMovies] = useState([]);
  const adminUser = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  //if havent got any filter value then filter="" (show all)
  const { filter } = location.state || { filter: "" };

  //load all movies
  useEffect(() => {
    const getAllMovies = async () => {
      if (!sessionStorage.getItem("accessToken")) {
        navigate("/");
      }

      try {
        const { data } = await axios.get(moviesUrl, {
          headers: { "x-access-token": sessionStorage.getItem("accessToken") },
        });
        setMovies(data);
      } catch (err) {
        navigate("/");
      }
    };
    getAllMovies();
  }, []);

  const deleteMovie = (movieId) => {
    setMovies(movies.filter((m) => m.movieId !== movieId));
  };

  return (
    <>
      {adminUser.permission.ViewMovies && (
        <div className="grid xl:grid-cols-4 gap-y-16 ml-32 mr-32 mt-20 lg:grid-cols-3 sm:grid-cols-2">
          {movies.map((movie) => {
            if (
              movie.movieName
                .toLowerCase()
                .includes(filter.toLowerCase().trim())
            )
              return (
                <Movie
                  key={movie.movieId}
                  movie={movie}
                  deleteMovie={deleteMovie}
                  permission={adminUser.permission}
                />
              );
          })}
        </div>
      )}
    </>
  );
}

export default AllMovies;
