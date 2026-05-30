const { v4: uuidv4 } = require("uuid");
const requestsRepo = require("../repositories/requests.repository");
class RequestsService {
    getAll() { return requestsRepo.getAll(); }
    create(dto) {
        const newReq = { id: uuidv4(), userId: dto.userId, status: "Pending", date: new Date() };
        return requestsRepo.add(newReq);
    }
}
module.exports = new RequestsService();