export default class FavorateService {
    constructor() {
        this.favorates = [];
    }

    add(parkId) {
        if (!this.contains(parkId))
            this.favorates.push(parkId);
    }

    remove(parkId) {
        if (this.contains(parkId)) {
            var index = this.favorates.findIndex(x => x === parkId);
            this.favorates.splice(index, 1);
        }
    }

    contains(parkId) {
        return this.favorates.indexOf(parkId) > -1;
    }

    getAll() {
        return this.favorates;
    }
}