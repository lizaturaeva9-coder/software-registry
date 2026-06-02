const sqlite3 = require('sqlite3');
const path = require('path');
const db = new sqlite3.Database(path.join(__dirname, '../../data/app.db'));

const all = (sql, params = []) => new Promise((res, rej) => db.all(sql, params, (err, rows) => err ? rej(err) : res(rows)));
const run = (sql, params = []) => new Promise((res, rej) => db.run(sql, params, err => err ? rej(err) : res()));


const ALLOWED_COLUMNS = new Set(['id', 'name', 'version', 'seats']);

async function getAll(sortBy = 'id') {
    const sortColumn = ALLOWED_COLUMNS.has(sortBy) ? sortBy : 'id';
    return await all(`SELECT * FROM Software ORDER BY ${sortColumn} ASC;`);
}

async function getByIdAndOwner(name, ownerUserId) {
  
    const rows = await all(`SELECT * FROM Software WHERE name = ? AND ownerUserId = ?;`, [name, ownerUserId]);
    return rows[0] || null;
}

async function add(item) {
   
    await run(`INSERT INTO Software (name, version, licenseType, seats, comment, ownerUserId) VALUES (?, ?, ?, ?, ?, ?);`,
        [item.name, item.version, item.licenseType, item.seats, item.comment, item.ownerUserId]);
}

async function update(name, item, ownerUserId) {
   
   await run(`UPDATE Software SET name = ?, version = ?, licenseType = ?, seats = ?, comment = ? WHERE name = ? AND ownerUserId = ?;`,
        [item.name, item.version, item.licenseType, item.seats, item.comment, name, ownerUserId]);
}


async function remove(name, ownerUserId) {

    await run(`DELETE FROM Software WHERE name = ? AND ownerUserId = ?;`, [name, ownerUserId]);
}

module.exports = { getAll, getByIdAndOwner, add, update, remove };