class RequestsRepository {
    constructor() { this.items = []; }
    getAll() { return this.items; }
    add(item) { this.items.push(item); return item; }
}
module.exports = new RequestsRepository();