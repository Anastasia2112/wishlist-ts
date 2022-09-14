import { makeAutoObservable } from "mobx";

class CheckStore {
    public checkedWishes: string[];

    constructor () {
        this.checkedWishes = [];
        makeAutoObservable(this)
    };

    addCheck(id: string) {
        this.checkedWishes.push(id);
    };

    deleteCheck(id: string) {
        this.checkedWishes = this.checkedWishes.filter(check => check !== id);
    };

    updateCheck(id: string) {
        if (this.checkedWishes.includes(id)) {
            console.log("include");
            this.deleteCheck(id);
        } else this.addCheck(id);
    }

};

export default CheckStore;