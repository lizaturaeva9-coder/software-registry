const { all, run } = require("../db/dbClient");


async function getAll(req, res, next) {
    try {
        const licenses = await all(`
            SELECT 
                l.id, 
                l.licenseKey, 
                l.status, 
                u.name AS userName, 
                s.name AS softwareName
            FROM Licenses l
            JOIN Users u ON l.userId = u.id
            JOIN Software s ON l.softwareId = s.id
        `);
        return res.json(licenses);
    } catch (err) {
        return res.status(500).json({ error: { code: "INTERNAL_ERROR", message: err.message, details: null } });
    }
}


async function create(req, res, next) {
    try {
        const { key, softwareId } = req.body;

        if (!key || !softwareId) {
            return res.status(400).json({
                error: {
                    code: "VALIDATION_ERROR",
                    message: "Помилка валідації",
                    details: [{ message: "Поля key та softwareId є обов'язковими" }]
                }
            });
        }

        const defaultUserId = 1;         
        const defaultStatus = "active";  
        const createdAt = new Date().toISOString(); 

        await run(`
            INSERT INTO Licenses (id, licenseKey, userId, softwareId, status, createdAt) 
            VALUES (NULL, '${key}', ${defaultUserId}, ${softwareId}, '${defaultStatus}', '${createdAt}');
        `);
        
        return res.status(201).json({ licenseKey: key, userId: defaultUserId, softwareId, status: defaultStatus, createdAt });
    } catch (err) {
        return res.status(500).json({ error: { code: "INTERNAL_ERROR", message: err.message, details: null } });
    }
}


async function getValid(req, res, next) {
    try {
        const targetStatus = 'active'; 
        const licenses = await all(`
            SELECT 
                l.id, 
                l.licenseKey, 
                l.status, 
                u.name AS userName, 
                s.name AS softwareName
            FROM Licenses l
            JOIN Users u ON l.userId = u.id
            JOIN Software s ON l.softwareId = s.id
            WHERE l.status = '${targetStatus}';
        `);
       
        return res.json({ items: licenses });
    } catch (err) {
        return res.status(500).json({ error: { code: "INTERNAL_ERROR", message: err.message, details: null } });
    }
}


async function getTopThree(req, res, next) {
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
        
        return res.json({ items: stats });
    } catch (err) {
        return res.status(500).json({ error: { code: "INTERNAL_ERROR", message: err.message, details: null } });
    }
}

module.exports = { getAll, create, getValid, getTopThree };