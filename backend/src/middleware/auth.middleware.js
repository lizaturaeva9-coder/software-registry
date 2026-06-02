const repo = require('../repositories/software.repository');

const checkOwnership = async (req, res, next) => {
    const userId = parseInt(req.header("X-Demo-UserId"), 10);
    const resourceName = decodeURIComponent(req.params.name);

    const resource = await repo.getByIdAndOwner(resourceName, userId);
    
    if (!resource) {
        return res.status(403).json({ error: { code: "FORBIDDEN", message: "Немає доступу до цього ресурсу" } });
    }
    next();
};

module.exports = { checkOwnership };