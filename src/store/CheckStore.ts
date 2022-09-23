import { makeAutoObservable } from "mobx";

class CheckStore {
    public checkedWishes: string[];
    public isGranted: boolean;

    constructor () {
        this.checkedWishes = [];
        this.isGranted = false;
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
            this.deleteCheck(id);
        } else this.addCheck(id);
    }

    setIsGranted(value: boolean) {
        this.isGranted = value;
    }

};

export default CheckStore;