const { initDb } = require("./initDb");
const { run } = require("./dbClient");

async function seed() {
    try {
        await initDb();
        const now = new Date().toISOString();

        console.log("Видаляємо всі старі записи...");
        await run("DELETE FROM Licenses;");
        await run("DELETE FROM Software;");
        await run("DELETE FROM Users;");

        console.log("Записуємо дані: Єлизавета Тураєва...");
    
        await run(`
            INSERT INTO Users (id, email, name, createdAt) 
            VALUES (1, 'turaieva.yelizaveta@knu.ua', 'Yelizaveta Turaieva', '${now}');
        `);

        
        await run(`
            INSERT INTO Software (id, name, version, developer) VALUES 
            (1, 'IntelliJ IDEA', '2024.1', 'JetBrains'),
            (2, 'Docker Desktop', '4.28', 'Docker Inc.');
        `);

       
        await run(`
            INSERT INTO Licenses (licenseKey, userId, softwareId, status, createdAt) VALUES 
            ('ELI-ZABETH-777-PRO', 1, 1, 'active', '${now}');
        `);

        console.log("База ідеально чиста. У системі лише Yelizaveta Turaieva.");
        process.exit(0);
    } catch (err) {
        console.error("Помилка:", err);
        process.exit(1);
    }
}

seed();