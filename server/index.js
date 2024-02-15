const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const path = require("path");

const usersDBRouter = require("./routers/usersDBRouter");
const usersRouter = require("./routers/usersRouter");
const membersRouter = require("./routers/membersRouter");
const moviesRouter = require("./routers/moviesRouter");
const subsRouter = require("./routers/subscriptionsRouter");
const authRouter = require("./routers/authRouter");

const usersBLL = require("./BLL/usersBLL");
const usersDBBLL = require("./BLL/usersDBBLL");

const app = express();
const port = 8000;

const mongoKey =
  "mongodb+srv://admin:5JKCeWP4QdF5t7Hy@movieusersdb.fv95kmh.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoKey);

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../client/dist/")));

app.use("/auth", authRouter);
app.use("/userspass", usersDBRouter);
app.use("/users", usersRouter);
app.use("/members", membersRouter);
app.use("/movies", moviesRouter);
app.use("/subscriptions", subsRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.listen(port, () => {
  console.log(`app is listening at http://localhost:${port}`);

  //initialize in the DB admin login on the first run of the server
  const initAdmin = async () => {
    const allUsers=await usersBLL.userAmount();
    if(allUsers>0){
  return 0;
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash("admin", saltRounds);
    const id = await usersBLL.addUsersData({
      userName: "admin@gmail.com",
      firstName: "admin",
      lastName: "admin",
      createdDate: "01-12-2022",
      sessionTimeOut: 40000000,
      permission: {
        ViewSubscriptions: true,
        CreateSubscriptions: true,
        DeleteSubscriptions: true,
        UpdateSubscriptions: true,
        ViewMovies: true,
        CreateMovies: true,
        DeleteMovies: true,
        UpdateMovies: true,
      },
    });
    usersDBBLL.updateUser(id, { password: hashedPassword });
  };

  initAdmin();
});
