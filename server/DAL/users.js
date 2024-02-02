let jf = require("jsonfile");

const path = "data/users.json";

const getUsers = () => {
  return jf.readFile(path);
};

const setUsers = async (obj) => {
  await jf.writeFile(path, obj);
  return "Created!";
};

module.exports = { getUsers, setUsers };
