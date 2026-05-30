const sqlite3 = require('sqlite3').verbose();
const path = require('path');


const dbPath = path.join(process.cwd(), 'data', 'app.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) console.error('Помилка бази:', err.message);
    else console.log(' БАЗА ПІДКЛЮЧЕНА:', dbPath);
});

const all = (sql, params = []) => new Promise((res, rej) => {
    db.all(sql, params, (err, rows) => err ? rej(err) : res(rows));
});

const run = (sql, params = []) => new Promise((res, rej) => {
    db.run(sql, params, function(err) { err ? rej(err) : res(this); });
});

const get = (sql, params = []) => new Promise((res, rej) => {
    db.get(sql, params, (err, row) => err ? rej(err) : res(row));
});

module.exports = { db, all, run, get };