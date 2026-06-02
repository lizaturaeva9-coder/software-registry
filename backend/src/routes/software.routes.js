const express = require('express');
const router = express.Router();
const repo = require('../repositories/software.repository');
const { checkOwnership } = require('../middleware/auth.middleware');

router.get('/', async (req, res) => {
    const data = await repo.getAll();
    res.json(data);
});


router.put('/:name', checkOwnership, async (req, res) => {
    const name = decodeURIComponent(req.params.name);
    await repo.update(name, req.body, req.header("X-Demo-UserId"));
    res.json({ message: "Успішно оновлено" });
});

router.delete('/:name', checkOwnership, async (req, res) => {
    const name = decodeURIComponent(req.params.name);
    await repo.remove(name, req.header("X-Demo-UserId"));
    res.json({ message: "Успішно видалено" });
});

router.post('/', async (req, res) => {
    await repo.add({ ...req.body, ownerUserId: 1 });
    res.json({ message: "OK" });
});

module.exports = router;