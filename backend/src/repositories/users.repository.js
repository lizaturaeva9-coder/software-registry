const { all, get, run } = require("../db/dbClient"); 


async function getAll() {
    return await all("SELECT * FROM Users;");
}

async function getById(id) {
    return await get(`SELECT * FROM Users WHERE id = ${id};`);
}

async function create(name, email, createdAt) {
    return await run(`
        INSERT INTO Users (id, email, name, createdAt) 
        VALUES (NULL, '${email}', '${name}', '${createdAt}');
    `);
}

module.exports = { getAll, getById, create };