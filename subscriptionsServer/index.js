const express = require("express");
const cors = require("cors");
const connectDB = require("./configs/db");
const membersDAL = require("./DAL/MembersWS");
const moviesDAL = require("./DAL/MoviesWS");
const moviesBLL = require("./BLL/moviesBLL");
const membersBLL = require("./BLL/membersBLL");

const subscriptionBLL = require("./BLL/subscriptionsBLL");

const subscriptionsRouter = require("./routers/subscriptionsRouter");
const moviesRouter = require("./routers/moviesRouter");
const membersRouter = require("./routers/membersRouter");

const app = express();
const port = 3000;

connectDB();

app.use(cors());
app.use(express.json());

app.use("/subscriptions", subscriptionsRouter);
app.use("/movies", moviesRouter);
app.use("/members", membersRouter);

app.listen(port, () => {
  console.log(`app is listening at http://localhost:${port}`);

  //initialize in the DB the movies and the members on the first run of the server
  const initData = async () => {
    const members = await membersDAL.getAllMembers();
    const movies = await moviesDAL.getAllMovies();
    moviesBLL.initMovies(movies.data);
    membersBLL.initMembers(members.data);
  };

  initData();
});
