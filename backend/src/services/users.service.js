const { v4: uuidv4 } = require("uuid");
const usersRepository = require("../repositories/users.repository");

class UsersService {
    getAll() {
        return usersRepository.getAll();
    }

    getById(id) {
        const user = usersRepository.getById(id);
        if (!user) {
            const error = new Error("Користувача не знайдено");
            error.status = 404;
            error.code = "NOT_FOUND";
            throw error;
        }
        return user;
    }


    create(dto) {
        
        if (!dto.name || !dto.email) {
            const error = new Error("Помилка валідації");
            error.status = 400;
            error.code = "VALIDATION_ERROR";
            error.details = [{ message: "Name та email є обов'язковими" }];
            throw error;
        }

       
        const newUser = {
            id: uuidv4(), 
            name: dto.name,
            email: dto.email,
            role: dto.role || "User" 
        };

        return usersRepository.add(newUser);
    }

   
    delete(id) {
       
        this.getById(id);
        return usersRepository.delete(id);
    }
}

module.exports = new UsersService();