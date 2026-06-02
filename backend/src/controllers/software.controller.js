const softwareService = require("../services/software.service");

async function getAll(req, res, next) {
    try {
        const list = await softwareService.getSoftwareList();
        res.json(list);
    } catch (err) {
        next(err); 
    }
}

async function getById(req, res, next) {
    try {
       
        const item = await softwareService.getSoftwareById(req.params.id, req.user.id);
        res.json(item);
    } catch (err) {
        next(err);
    }
}

async function create(req, res, next) {
    try {
       
        const newItem = await softwareService.createSoftware(req.body, req.user.id);
        res.status(201).json(newItem);
    } catch (err) {
        next(err);
    }
}

async function update(req, res, next) {
    try {
       
        const updatedItem = await softwareService.updateSoftware(req.params.name, req.body, req.user.id);
        res.json(updatedItem);
    } catch (err) {
        next(err);
    }
}

async function remove(req, res, next) {
    try {
      
        const result = await softwareService.deleteSoftware(req.params.name, req.user.id);
        res.json(result);
    } catch (err) {
        next(err);
    }
}

module.exports = { getAll, getById, create, update, remove };