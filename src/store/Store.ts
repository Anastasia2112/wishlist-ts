import { makeAutoObservable } from "mobx";

// if (localStorage.getItem('user')) {
//     let userLS = JSON.parse(localStorage.getItem('user')!);
// }


class Store {
    public isAuth: boolean;
    public user: object | null;

    constructor () {
        this.isAuth = Boolean(localStorage.getItem('auth'));
        this.user = {};
        makeAutoObservable(this)
    };

    setIsAuth(auth: boolean) {
        this.isAuth = auth;
    };

    setUser(user: object) {
        this.user = user;
    };
};

const store = new Store();

export default store;