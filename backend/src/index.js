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

        try {
            await run(`INSERT INTO Software (id, name, version, developer) VALUES (1, 'VS Code', '1.85', 'Microsoft');`);
        } catch (e) {}

        try {
            await run(`INSERT INTO Software (id, name, version, developer) VALUES (2, 'WebStorm', '2024.1', 'JetBrains');`);
        } catch (e) {}

        try {
            await run(`INSERT INTO Software (id, name, version, developer) VALUES (3, 'Photoshop', '25.0', 'Adobe');`);
        } catch (e) {}

        try {
            const stats = await all(`
                SELECT 
                    s.developer, 
                    COUNT(l.id) AS licenseCount
                FROM Licenses l
                JOIN Software s ON l.softwareId = s.id
                GROUP BY s.developer
                ORDER BY licenseCount DESC
                LIMIT 3;
            `);
            
            console.log("\nТоп 3 девелопера за кількістю ліцензій:");
            console.log(JSON.stringify(stats, null, 2)); 
            console.log("\n");
        } catch (err) {}

        app.listen(PORT, () => {
            console.log(` СЕРВЕР ЗАПУЩЕНО: http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error(' Помилка при старті:', err.message);
    }
}

start();