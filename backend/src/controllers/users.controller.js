const usersRepository = require("../repositories/users.repository");

async function getAll(req, res, next) {
    try {
        const users = await usersRepository.getAll();
        res.json(users);
    } catch (err) {
        next(err);
    }
}

async function create(req, res, next) {
    try {
        const { name, email, createdAt } = req.body;

        if (!name || !email || !createdAt) {
            return res.status(400).json({
                error: {
                    code: "VALIDATION_ERROR",
                    message: "Помилка валідації",
                    details: [{ message: "Name, email та createdAt є обов'язковими" }]
                }
            });
        }

        await usersRepository.create(name, email, createdAt);
        res.status(201).json({ name, email, createdAt });
    } catch (err) {
        next(err);
    }
}


module.exports = { getAll, create };