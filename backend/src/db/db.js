const path = require("path");
const fs = require("fs");
const sqlite3 = require("sqlite3").verbose(); 


const dataDir = path.join(__dirname, "..", "..", "data");
const dbPath = path.join(dataDir, "app.db");


if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}


const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Помилка відкриття БД:", err.message); 
        process.exit(1);
    }
    console.log("База SQLite успішно відкрита:", dbPath); 
});

module.exports = { db }; 