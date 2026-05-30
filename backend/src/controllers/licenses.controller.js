const licensesRepository = require("../repositories/licenses.repository");

async function getAll(req, res, next) {
    try {
        const licenses = await licensesRepository.getAll();
        res.json(licenses);
    } catch (err) {
        next(err);
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

        await licensesRepository.create(key, softwareId);
        res.status(201).json({ key, softwareId });
    } catch (err) {
        next(err);
    }
}

module.exports = { getAll, create };