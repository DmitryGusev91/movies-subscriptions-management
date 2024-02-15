const usersFile = require("../DAL/users");
const permFile = require("../DAL/permissions");
const User = require("../models/UserModel");

//returns new array with all users and their permissions and userName
const getAllUsersData = async () => {
  try {
    const predefinedPermissions = [
      "View Subscriptions",
      "Create Subscriptions",
      "Delete Subscriptions",
      "Update Subscriptions",
      "View Movies",
      "Create Movies",
      "Delete Movies",
      "Update Movies",
    ];

    const users = await usersFile.getUsers();
    const permissions = await permFile.getPermissions();
    const usersDB = await User.find({});
    const finalUsers = users.map((user) => {
      let userDB = usersDB.find((us) => String(us._id) === user._id);
      let permission = permissions.find((perm) => perm._id === user._id);
      if (permission) {
        let booleanPermissions = predefinedPermissions.reduce(
          (result, perm) => {
            result[perm.replace(/\s+/g, "")] =
              permission.permission.includes(perm);
            return result;
          },
          {}
        );

        return {
          ...user,
          permission: booleanPermissions,
          userName: userDB.name,
        };
      }
      return { ...user, userName: userDB.name };
    });
    return finalUsers;
  } catch (error) {
    console.error("Error fetching users or permissions:", error);
    throw error;
  }
};

const userAmount=async()=>{
const users= await User.find({});
  return users.length;
}

//returns user and his permissions
const getUserData = async (id) => {
  try {
    const predefinedPermissions = [
      "View Subscriptions",
      "Create Subscriptions",
      "Delete Subscriptions",
      "Update Subscriptions",
      "View Movies",
      "Create Movies",
      "Delete Movies",
      "Update Movies",
    ];

    const users = await usersFile.getUsers();
    const permissions = await permFile.getPermissions();
    const userDB = await User.findById(id);
    const user = users.find((us) => us._id === id);
    const permission = permissions.find((per) => per._id === id);
    const booleanPermissions = predefinedPermissions.reduce((result, perm) => {
      result[perm.replace(/\s+/g, "")] = permission.permission.includes(perm);
      return result;
    }, {});
    const finalUsers = {
      _id: id,
      firstName: user.firstName,
      lastName: user.lastName,
      createdDate: user.createdDate,
      sessionTimeOut: user.sessionTimeOut,
      permission: { ...booleanPermissions },
      userName: userDB.name,
    };
    return finalUsers;
  } catch (error) {
    console.error("Error fetching users or permissions:", error);
    throw error;
  }
};

//updates a given user and its permissions in their JSONs and userName in the DB
const updateUsersData = async (id, obj) => {
  try {
    await User.findByIdAndUpdate(id, { name: obj.userName });

    const users = await usersFile.getUsers();
    const permissions = await permFile.getPermissions();
    const filteredUsers = users.filter((us) => String(us._id) !== id);
    const filteredPermissions = permissions.filter((per) => per._id !== id);

    const truePermissionsArray = Object.keys(obj.permission)
      .filter((permission) => obj.permission[permission])
      .map((permission) => permission.replace(/([a-z])([A-Z])/g, "$1 $2"));

    const user = {
      _id: obj._id,
      firstName: obj.firstName,
      lastName: obj.lastName,
      createdDate: obj.createdDate,
      sessionTimeOut: obj.sessionTimeOut,
    };
    const permission = { _id: obj._id, permission: truePermissionsArray };
    await usersFile.setUsers([...filteredUsers, user]);
    await permFile.setPermissions([...filteredPermissions, permission]);
  } catch (error) {
    console.error("Error fetching users or permissions:", error);
    throw error;
  }
};

//get combined object (user+permissions) and deletes it from permissions JSON and users JSON and user from DB
const deleteUsersData = async (id) => {
  try {
    await User.findByIdAndDelete(id);

    const users = await usersFile.getUsers();
    const permissions = await permFile.getPermissions();
    const filteredUsers = users.filter((us) => us._id !== id);
    const filteredPermissions = permissions.filter((per) => per._id !== id);
    await usersFile.setUsers(filteredUsers);
    await permFile.setPermissions(filteredPermissions);
  } catch (error) {
    console.error("Error fetching users or permissions:", error);
    throw error;
  }
};

//get combined object (user+permissions) and adds it users JSON and permissions JSON and creates new user in mongo userDB
//need to give all the data again ,even the one that dont updates itself because jsons delete and updates anew ONLY what you gave
const addUsersData = async (obj) => {
  const userDB = new User({ name: obj.userName });
  await userDB.save();

  const users = await usersFile.getUsers();
  const permissions = await permFile.getPermissions();
  const user = {
    _id: userDB._id,
    firstName: obj.firstName,
    lastName: obj.lastName,
    createdDate: obj.createdDate,
    sessionTimeOut: obj.sessionTimeOut,
  };

  const truePermissionsArray = Object.keys(obj.permission)
    .filter((permission) => obj.permission[permission])
    .map((permission) => permission.replace(/([a-z])([A-Z])/g, "$1 $2"));

  const permission = {
    _id: String(userDB._id),
    permission: truePermissionsArray,
  };

  await usersFile.setUsers([...users, user]);

  await permFile.setPermissions([...permissions, permission]);

  return userDB._id;
};

module.exports = {
  getUserData,
  getAllUsersData,
  updateUsersData,
  deleteUsersData,
  addUsersData,userAmount,
};
