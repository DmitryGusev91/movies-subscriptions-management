import { Route, Routes } from "react-router-dom";

import NabBar from "./components/NavbarComp";
import Movies from "./components/movies/MoviesComp";
import Users from "./components/users/UsersComp";
import Subs from "./components/subscriptions/SubscriptionsComp";
import AddEditMovie from "./components/movies/AddEditMovieComp";
import AllMovies from "./components/movies/AllMoviesComp";
import AddEditSub from "./components/subscriptions/AddEditSubscriptionComp";
import AllSubs from "./components/subscriptions/AllSubscriptionsComp";
import AllUsers from "./components/users/AllUsersComp";
import AddEditUsers from "./components/users/AddEditUserComp";
import Login from "./components/LoginComp";
import Register from "./components/RegisterComp";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<NabBar />}>
          <Route path="movies" element={<Movies />}>
            <Route path="new" element={<AddEditMovie />} />
            <Route path="all" element={<AllMovies />} />
          </Route>
          <Route path="movies/:id" element={<AddEditMovie />} />

          <Route path="subscriptions" element={<Subs />}>
            <Route path="new" element={<AddEditSub />} />
            <Route path="all" element={<AllSubs />} />
          </Route>
          <Route path="subscriptions/:id" element={<AddEditSub />} />

          <Route path="users" element={<Users />}>
            <Route path="new" element={<AddEditUsers />} />
            <Route path="all" element={<AllUsers />} />
          </Route>
          <Route path="users/:id" element={<AddEditUsers />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
