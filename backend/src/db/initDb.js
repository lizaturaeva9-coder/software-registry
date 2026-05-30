const { run } = require("./dbClient");

async function initDb() {
    // Вмикаємо підтримку зв'язків між таблицями [cite: 142, 514]
    await run("PRAGMA foreign_keys = ON;");

    // Створюємо таблицю користувачів [cite: 145, 516]
    await run(`
        CREATE TABLE IF NOT EXISTS Users (
            id INTEGER PRIMARY KEY,
            email TEXT NOT NULL UNIQUE,
            name TEXT NOT NULL,
            createdAt TEXT NOT NULL
        );
    `);

    // Створюємо таблицю програмного забезпечення (твоя сутність) [cite: 1250]
    await run(`
        CREATE TABLE IF NOT EXISTS Software (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            version TEXT NOT NULL,
            developer TEXT NOT NULL
        );
    `);

    // Створюємо таблицю ліцензій зі зв'язками [cite: 151, 523]
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