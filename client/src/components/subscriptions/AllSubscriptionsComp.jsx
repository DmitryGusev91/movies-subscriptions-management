import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Sub from "./SubscriptionComp";
import { useNavigate } from "react-router-dom";

const subsUrl = "/subscriptions/members";
const moviesUrl = "/movies";
const membersURL = "/members";
const subscriptionUrl = "/subscriptions";


function AllSubs() {
  const [subs, setSubs] = useState([]);
  const [movies, setMovies] = useState([]);
  const adminUser = useSelector((state) => state.user);
const navigate=useNavigate()

  //load all members and movies
  useEffect(() => {
    console.log(adminUser)
    const getAllSubs = async () => {
      try {
        console.log("flag00")
        const { data } = await axios.get(subsUrl, {
          headers: { "x-access-token": sessionStorage.getItem("accessToken") },
        });

        setSubs(data);

      } catch (err) {
        navigate("/");
      }
    };

    const getAllMovies = async () => {
      try {

        const { data } = await axios.get(moviesUrl, {
          headers: { "x-access-token": sessionStorage.getItem("accessToken") },
        });

        setMovies(data);

      } catch (err) {
        navigate("/");
      }
    };

    getAllSubs();

    getAllMovies();
  console.log(subs)
    console.log(movies)
  }, []);

  //deletes sub from server and from client side
  const deleteSub = async (memberId) => {
    try {
      setSubs(subs.filter((s) => s._id !== memberId));
      await axios.delete(`${membersURL}/${memberId}`, {
        headers: { "x-access-token": sessionStorage.getItem("accessToken") },
      });
    } catch (err) {
      navigate("/");
    }
  };

  //adds the movie to the user movies array in this component and updates it in the server if exists , if not then creates new sub
  const addMovie = async (movieId, memberId, date) => {
    const subIndex = subs.findIndex((s) => s._id === memberId);
    const movie = movies.find((m) => m.movieId === movieId);

    //if there are no movies then create new subscription
    if (subs[subIndex].movies.length == 0) {
      try {
        await axios.post(
          subscriptionUrl,
          {
            memberId: memberId,
            movies: [{ movieId: movieId, date: date }],
          },
          {
            headers: { "x-access-token": sessionStorage.getItem("accessToken") },
          }
        );
      } catch (err) {
        navigate("/");
      }
      //if movies not empty then just add the movie to an existing subscription (update)
    } else {
      try {
        const { data: tmpSub } = await axios.get(
          `${subscriptionUrl}?memberId=${memberId}`,
          {
            headers: { "x-access-token": sessionStorage.getItem("accessToken") },
          }
        );
        await axios.put(
          `${subscriptionUrl}/${tmpSub[0]._id}`,
          {
            movies: [...tmpSub[0].movies, { movieId: movieId, date: date }],
          },
          {
            headers: { "x-access-token": sessionStorage.getItem("accessToken") },
          }
        );
      } catch (err) {
        navigate("/");
      }
    }

    //add movie to member in react compomponent
    setSubs([
      ...subs.slice(0, subIndex),
      {
        ...subs[subIndex],
        movies: [
          ...subs[subIndex].movies,
          {
            movieId: movieId,
            movieName: movie.movieName,
            subscriptionDate: date,
          },
        ],
      },
      ...subs.slice(subIndex + 1),
    ]);
  };

  return (
    <>
      {adminUser.permission.ViewSubscriptions && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 mx-20 my-16">
          {subs.map((sub) => {
            return (
              <Sub
                key={sub._id}
                sub={sub}
                deleteSubs={deleteSub}
                movies={movies}
                addMovie={addMovie}
                permission={adminUser.permission}
              />
            );
          })}
        </div>
      )}
    </>
  );
}

export default AllSubs;
