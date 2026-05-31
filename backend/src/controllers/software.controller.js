const softwareService = require("../services/software.service");

async function getAll(req, res) {
    try {
        const list = await softwareService.getSoftwareList();
        res.json(list);
    } catch (err) {
        res.status(500).json({ error: { code: "INTERNAL_ERROR", message: err.message } });
    }
}

async function getById(req, res) {
    try {
        const item = await softwareService.getSoftwareById(req.params.id);
        res.json(item);
    } catch (err) {
        res.status(err.status || 500).json({ error: { code: "NOT_FOUND", message: err.message } });
    }
}

async function create(req, res) {
    try {
        const newItem = await softwareService.createSoftware(req.body);
        res.status(201).json(newItem);
    } catch (err) {
        res.status(err.status || 500).json({ error: { code: "VALIDATION_ERROR", message: err.message } });
    }
}


async function update(req, res) {
    try {
        const updatedItem = await softwareService.updateSoftware(req.params.name, req.body);
        res.json(updatedItem);
    } catch (err) {
        res.status(err.status || 500).json({ error: { code: "UPDATE_ERROR", message: err.message } });
    }
}

async function remove(req, res) {
    try {
        const result = await softwareService.deleteSoftware(req.params.name);
        res.json(result);
    } catch (err) {
        res.status(err.status || 500).json({ error: { code: "DELETE_ERROR", message: err.message } });
    }
}

module.exports = { getAll, getById, create, update, remove };