const softwareRepository = require("../repositories/software.repository");

async function getSoftwareList(sortBy) {
    return await softwareRepository.getAll(sortBy);
}

async function getSoftwareById(nameOrId, ownerUserId) {
    
    const item = await softwareRepository.getByIdAndOwner(nameOrId, ownerUserId);
    if (!item) {
        const err = new Error("Програму не знайдено, або у вас немає прав на її перегляд (Захист від IDOR)");
        err.status = 404; 
        err.code = "NOT_FOUND";
        throw err;
    }
    return item;
}

async function createSoftware(data, ownerUserId) {
    if (!data.name || data.name.trim() === "") {
        const err = new Error("Назва програми є обов'язковою");
        err.status = 400;
        err.code = "VALIDATION_ERROR";
        throw err;
    }
    if (data.seats === undefined || data.seats < 0 || isNaN(data.seats)) {
        const err = new Error("Кількість місць (seats) не може бути меншою за 0");
        err.status = 400;
        err.code = "VALIDATION_ERROR";
        throw err;
    }

    const newSoftware = {
        name: data.name,
        version: data.version || "1.0",
        licenseType: data.licenseType || "Free",
        seats: Number(data.seats),
        comment: data.comment || "",
        ownerUserId: ownerUserId 
    };

    return await softwareRepository.add(newSoftware);
}

async function updateSoftware(name, data, ownerUserId) {
   
    await getSoftwareById(name, ownerUserId); 

    if (data.seats === undefined || data.seats < 0 || isNaN(data.seats)) {
        const err = new Error("Кількість місць (seats) не може бути меншою за 0");
        err.status = 400;
        err.code = "VALIDATION_ERROR";
        throw err;
    }

    const updatedData = {
        version: data.version || "1.0",
        licenseType: data.licenseType || "Free",
        seats: Number(data.seats),
        comment: data.comment || ""
    };

    return await softwareRepository.update(name, updatedData, ownerUserId);
}

async function deleteSoftware(name, ownerUserId) {
    
    await getSoftwareById(name, ownerUserId);
    return await softwareRepository.remove(name, ownerUserId);
}

module.exports = {
    getSoftwareList,
    getSoftwareById,
    createSoftware,
    updateSoftware,
    deleteSoftware
};