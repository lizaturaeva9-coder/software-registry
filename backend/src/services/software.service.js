const softwareRepository = require("../repositories/software.repository");

async function getSoftwareList() {
    return await softwareRepository.getAll();
}

async function getSoftwareById(name) {
    const item = await softwareRepository.getById(name);
    if (!item) {
        const err = new Error("Програму з такою назвою не знайдено");
        err.status = 404;
        throw err;
    }
    return item;
}

async function createSoftware(data) {
    if (!data.name || data.name.trim() === "") {
        const err = new Error("Назва програми є обов'язковою");
        err.status = 400;
        throw err;
    }
    if (data.seats === undefined || data.seats < 0 || isNaN(data.seats)) {
        const err = new Error("Кількість місць (seats) не може бути меншою за 0");
        err.status = 400;
        throw err;
    }

    const newSoftware = {
        name: data.name,
        version: data.version || "1.0",
        licenseType: data.licenseType || "Free",
        seats: Number(data.seats),
        comment: data.comment || ""
    };

    return await softwareRepository.add(newSoftware);
}


async function updateSoftware(name, data) {
    await getSoftwareById(name); 

    if (data.seats === undefined || data.seats < 0 || isNaN(data.seats)) {
        const err = new Error("Кількість місць (seats) не може бути меншою за 0");
        err.status = 400;
        throw err;
    }

    const updatedData = {
        version: data.version || "1.0",
        licenseType: data.licenseType || "Free",
        seats: Number(data.seats),
        comment: data.comment || ""
    };

    return await softwareRepository.update(name, updatedData);
}

async function deleteSoftware(name) {
    await getSoftwareById(name);
    return await softwareRepository.remove(name);
}

module.exports = {
    getSoftwareList,
    getSoftwareById,
    createSoftware,
    updateSoftware,
    deleteSoftware
};