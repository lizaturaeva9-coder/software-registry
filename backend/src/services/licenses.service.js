const { v4: uuidv4 } = require("uuid");
const licensesRepository = require("../repositories/licenses.repository");

class LicensesService {
    getAll() { return licensesRepository.getAll(); }
    create(dto) {
        const newLicense = {
            id: uuidv4(),
            key: dto.key,
            softwareId: dto.softwareId || null
        };
        return licensesRepository.add(newLicense);
    }
}
module.exports = new LicensesService();