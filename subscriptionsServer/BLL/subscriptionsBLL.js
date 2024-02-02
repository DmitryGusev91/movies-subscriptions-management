const Subscription = require("../models/SubscriptionModel");
const Movie = require("../models/MovieModel");
const Member=require("../models/MemberModel")

const getAllSubscriptions = (filters = {}) => {
  return Subscription.find(filters);
};

const getSubscriptionByID = (id) => {
  return Subscription.findById(id);
};

const updateSubscription = async (id, obj) => {
  await Subscription.findByIdAndUpdate(id, obj);
  return "Updated!";
};

const deleteSubscription = async (id) => {
  await Subscription.findByIdAndDelete(id);
  return "Deleted!";
};

const addSubscription = async (obj) => {
  const subsctiption = new Subscription(obj);
  await subsctiption.save();
  return "Created!";
};

//combines the movies with their members and returns it
const getMovieDetails = async () => {
  const allMembers = await getMembersOfMovie();
  let movies = await getAllMovies();

  allMembers.forEach((x) => {
    let index = movies.findIndex((y) => String(y.movieId) === String(x.movieId));

    movies[index].members = movies[index].members.concat(x.members);
  });

  return movies;
};

//gets all movies data
const getAllMovies = async () => {
  try {
    const subscriptions = await Movie.aggregate([
      {
        $lookup: {
          from: "subscriptions",
          let: { movieId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$movies.movieId", "$$movieId"],
                },
              },
            },
            {
              $lookup: {
                from: "members",
                localField: "memberId",
                foreignField: "_id",
                as: "memberDetails",
              },
            },
            {
              $unwind: {
                path: "$memberDetails",
                preserveNullAndEmptyArrays: true,
              },
            },
            {
              $project: {
                memberId: "$memberDetails._id",
                memberName: "$memberDetails.name",
                subscriptionDate: "$movies.date",
              },
            },
          ],
          as: "members",
        },
      },
      {
        $project: {
          _id: 0, // Exclude _id from the output
          movieId: "$_id",
          movieName: "$name",
          movieGenres: "$genres",
          image: "$image",
          premieredDate: "$premiered",
          members: "$members",
        },
      },
    ]);

    return subscriptions;
  } catch (error) {
    throw error;
  }
};

//gets all the movies with their members
const getMembersOfMovie = async () => {
  try {
    const subscriptions = await Subscription.aggregate([
      {
        $unwind: "$movies",
      },
      {
        $lookup: {
          from: "movies",
          localField: "movies.movieId",
          foreignField: "_id",
          as: "movieDetails",
        },
      },
      {
        $unwind: "$movieDetails",
      },
      {
        $lookup: {
          from: "members",
          localField: "memberId",
          foreignField: "_id",
          as: "memberDetails",
        },
      },
      {
        $unwind: "$memberDetails",
      },
      {
        $group: {
          _id: "$movies.movieId",
          members: {
            $addToSet: {
              memberId: "$memberDetails._id",
              memberName: "$memberDetails.name",
              subscriptionDate: "$movies.date",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          movieId: "$_id",
          members: 1,
        },
      },
    ]);

    return subscriptions;
  } catch (error) {
    throw error;
  }
};

//returns id of suscription, name,email and city from member and an array of movies each contains movie id,movie name and subscription to movie date
const getSubscriptionsDetails = async () => {
  try {
    const membersDetails = await Member.aggregate([
      {
        $lookup: {
          from: "subscriptions",
          localField: "_id",
          foreignField: "memberId",
          as: "subscriptions",
        },
      },
      {
        $unwind: {
          path: "$subscriptions",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "movies",
          localField: "subscriptions.movies.movieId",
          foreignField: "_id",
          as: "movieDetails",
        },
      },
      {
        $unwind: {
          path: "$movieDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: "$_id",
          subId: { $first: "$subscriptions._id" },
          name: { $first: "$name" },
          email: { $first: "$email" },
          city: { $first: "$city" },
          movies: {
            $push: {
              movieId: "$movieDetails._id",
              movieName: "$movieDetails.name",
              subscriptionDate: {
                $first: "$subscriptions.movies.date", // Change here
              },
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          subId: 1,
          name: 1,
          email: 1,
          city: 1,
          movies: 1,
        },
      },
    ]);

    const updatedMembersArray = membersDetails.map(member => {
      if (member.movies && member.movies.length === 1 && member.movies[0].subscriptionDate === null) {
        member.movies = []; // Replace with an empty array
      }
      return member;
    });

    return updatedMembersArray;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getMovieDetails,
  getSubscriptionsDetails,
  getAllSubscriptions,
  getSubscriptionByID,
  updateSubscription,
  deleteSubscription,
  addSubscription,
};
