const { v4: uuidv4 } = require("uuid");
const softwareRepository = require("../repositories/software.repository");

class SoftwareService {
    
    getAll() {
        return softwareRepository.getAll();
    }

  
    getById(id) {
        const software = softwareRepository.getById(id);
        if (!software) {
            const error = new Error("Програму не знайдено");
            error.status = 404;
            error.code = "NOT_FOUND";
            throw error;
        }
        return software;
    }

   
    create(dto) {
        const errors = [];
      
        if (!dto.name || dto.name.trim() === "") {
            errors.push({ field: "name", message: "Назва є обов'язковою" });
        }
        if (!dto.version || dto.version.trim() === "") {
            errors.push({ field: "version", message: "Версія є обов'язковою" });
        }
        if (!dto.seats || Number(dto.seats) <= 0) {
            errors.push({ field: "seats", message: "Кількість місць має бути більшою за 0" });
        }

        
        if (errors.length > 0) {
            const error = new Error("Помилка валідації");
            error.status = 400;
            error.code = "VALIDATION_ERROR";
            error.details = errors;
            throw error;
        }

       
        const newSoftware = {
            id: uuidv4(), 
            name: dto.name.trim(),
            version: dto.version.trim(),
            licenseType: dto.licenseType || "Free",
            seats: Number(dto.seats),
            comment: dto.comment || ""
        };

       
        return softwareRepository.add(newSoftware);
    }

   
    delete(id) {
       
        this.getById(id);
        return softwareRepository.delete(id);
    }
}

module.exports = new SoftwareService();