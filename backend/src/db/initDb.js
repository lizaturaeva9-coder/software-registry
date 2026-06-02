const sqlite3 = require('sqlite3');
const path = require('path');
const fs = require('fs');

const dbDir = path.join(__dirname, '../../data');
if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir);

const db = new sqlite3.Database(path.join(dbDir, 'app.db'));

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL);`);
    db.run(`CREATE TABLE IF NOT EXISTS Software (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        version TEXT NOT NULL,
        licenseType TEXT NOT NULL,
        seats INTEGER NOT NULL,
        comment TEXT NOT NULL,
        ownerUserId INTEGER NOT NULL
    );`);

    db.get("SELECT COUNT(*) as count FROM Users", (err, row) => {
        if (row && row.count === 0) {
            db.run("INSERT INTO Users (name) VALUES ('Yelyzaveta'), ('Denys');");
            db.run("INSERT INTO Software (name, version, licenseType, seats, comment, ownerUserId) VALUES ('VS Code', '1.90.2', 'Free', 30, 'Основне середовище', 1);");
            db.run("INSERT INTO Software (name, version, licenseType, seats, comment, ownerUserId) VALUES ('WebStorm', '2024.1.2', 'Academic', 25, 'Секретний софт Дениса', 2);");
        }
    });
});
db.close();

   
    await run(`
        CREATE TABLE IF NOT EXISTS Licenses (
            id INTEGER PRIMARY KEY,
            licenseKey TEXT NOT NULL UNIQUE,
            userId INTEGER NOT NULL,
            softwareId INTEGER NOT NULL,
            status TEXT NOT NULL CHECK (status IN ('active', 'expired')),
            createdAt TEXT NOT NULL,
            FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE,
            FOREIGN KEY (softwareId) REFERENCES Software(id) ON DELETE RESTRICT
        );
    `);

    console.log("DB schema initialized"); 


module.exports = { initDb }; 