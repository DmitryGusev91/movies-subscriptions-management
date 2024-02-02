import { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";

function Movies() {
  const [sequence, setSequence] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-center space-x-4 mt-6 text-lg">
        <span className="text-2xl font-bold">Movies</span>
        <span>|</span>
        <button className="hover:text-sky-100 " onClick={() => navigate("all")}>
          All Movies
        </button>
        <span>|</span>
        <button className="hover:text-sky-100 " onClick={() => navigate("new")}>
          Add Movie
        </button>
        <span>|</span>
        <span>Find Movie: </span>
        <input
          className="bg-cardBlue text-black"
          type="text"
          onChange={(e) => setSequence(e.target.value)}
        ></input>
        <button
          className="hover:text-sky-100"
          onClick={() => navigate("all", { state: { filter: sequence } })}
        >
          Find
        </button>
      </div>
      <Outlet></Outlet>
    </>
  );
}

export default Movies;
