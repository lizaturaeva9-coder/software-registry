const app = require('./app');
const { initDb } = require('./db/initDb');
const { run, all } = require("./db/dbClient"); 
const PORT = 3000;

async function start() {
    try {
        await initDb();
        console.log(' База даних готова');

        const userId = 1;
        const userEmail = "turaieva@knu.ua";
        const userName = "Тураєва Єлизавета";
        const userCreatedAt = new Date().toISOString();

        try {
            await run(`
                INSERT INTO Users (id, email, name, createdAt) 
                VALUES (${userId}, '${userEmail}', '${userName}', '${userCreatedAt}');
            `);
            console.log(' Тестовий користувач успішно створений');
        } catch (err) {}

        app.listen(PORT, () => {
            console.log(` СЕРВЕР ЗАПУЩЕНО: http://localhost:${PORT}`);
        });

    } catch (err) {
        console.error(' Помилка при старті:', err.message);
    }
} 

start(); 