const db = require("../data/db-config");

const getAll = async () => {
  return await db("some_data");
};

module.exports = {
  getAll,
};
