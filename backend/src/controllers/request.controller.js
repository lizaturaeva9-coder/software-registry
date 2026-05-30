const requestsService = require("../services/requests.service");

async function getAll(req, res, next) {
    try {
       
        let requests = [];
        if (requestsService && typeof requestsService.getAll === 'function') {
            requests = await requestsService.getAll();
        }
        res.json(requests);
    } catch (err) {
        next(err);
    }
}

module.exports = { getAll };