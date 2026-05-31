const { run, all } = require("../db/dbClient");

async function getAll() {
    return await all("SELECT * FROM Software;");
}

async function getById(name) {
    const rows = await all(`SELECT * FROM Software WHERE name = '${name.replace(/'/g, "''")}';`);
    return rows[0] || null;
}

async function add(softwareData) {
    let { name, version, licenseType, seats, comment } = softwareData;
    
    name = name.replace(/'/g, "''");
    version = version.replace(/'/g, "''");
    licenseType = licenseType.replace(/'/g, "''");
    comment = comment.replace(/'/g, "''");
    
    await run(`
        INSERT INTO Software (name, version, licenseType, seats, comment)
        VALUES ('${name}', '${version}', '${licenseType}', ${seats}, '${comment}');
    `);
    
    return softwareData;
}


async function update(name, updateData) {
    let { version, licenseType, seats, comment } = updateData;
    
    const safeName = name.replace(/'/g, "''");
    version = version.replace(/'/g, "''");
    licenseType = licenseType.replace(/'/g, "''");
    comment = comment.replace(/'/g, "''");

    await run(`
        UPDATE Software 
        SET version = '${version}', licenseType = '${licenseType}', seats = ${seats}, comment = '${comment}'
        WHERE name = '${safeName}';
    `);

    return { name, ...updateData };
}

async function remove(name) {
    await run(`DELETE FROM Software WHERE name = '${name.replace(/'/g, "''")}';`);
    return { name };
}

module.exports = { getAll, getById, add, remove, update };