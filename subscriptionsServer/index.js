const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const membersDAL = require("./DAL/MembersWS");
const moviesDAL = require("./DAL/MoviesWS");
const moviesBLL = require("./BLL/moviesBLL");
const membersBLL = require("./BLL/membersBLL");

const mongoKey =
  "mongodb+srv://admin:ZR0AvrOhNMlVilyW@moviesandsubs.m1fyzfl.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoKey);

const subscriptionsRouter = require("./routers/subscriptionsRouter");
const moviesRouter = require("./routers/moviesRouter");
const membersRouter = require("./routers/membersRouter");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use("/subscriptions", subscriptionsRouter);
app.use("/movies", moviesRouter);
app.use("/members", membersRouter);

app.listen(port, () => {
  console.log(`app is listening at http://localhost:${port}`);

  //initialize in the DB the movies and the members on the first run of the server
  const initData = async () => {
    const allMovies=await moviesBLL.getAllMovies();
    if(allMovies.length===0){
      return 0;}
    const members = await membersDAL.getAllMembers();
    const movies = await moviesDAL.getAllMovies();
    moviesBLL.initMovies(movies.data);
    membersBLL.initMembers(members.data);
  };

  initData();
});
