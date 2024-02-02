let jf = require("jsonfile");

const path = "data/permissions.json";

const getPermissions = () => {
  return jf.readFile(path);
};

const setPermissions = async (obj) => {
  await jf.writeFile(path, obj);
  return "Created!";
};

module.exports = { getPermissions, setPermissions };
