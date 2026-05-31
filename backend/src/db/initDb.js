const { run } = require("./dbClient");

async function initDb() {
    
    await run("PRAGMA foreign_keys = ON;");

   
    await run(`
        CREATE TABLE IF NOT EXISTS Users (
            id INTEGER PRIMARY KEY,
            email TEXT NOT NULL UNIQUE,
            name TEXT NOT NULL,
            createdAt TEXT NOT NULL
        );
    `);

    
   await run(`
        CREATE TABLE IF NOT EXISTS Software (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            version TEXT NOT NULL,
            licenseType TEXT DEFAULT 'Free',
            seats INTEGER NOT NULL,
            comment TEXT
        );
    `);

   
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
}

module.exports = { initDb }; 