const softwareRepository = require("../repositories/software.repository");

async function getAll(req, res, next) {
    try {
        const software = await softwareRepository.getAll();
        res.json(software);
    } catch (err) {
        next(err);
    }
}


module.exports = { getAll };