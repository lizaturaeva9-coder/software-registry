const { all } = require("../db/dbClient");

async function getAll() {
   
    return await all("SELECT * FROM Software;");
}

module.exports = { getAll };