import { makeAutoObservable } from "mobx";

class UserStore {
    public isAuth: boolean;
    public user: string | null;

    constructor () {
        this.isAuth = Boolean(localStorage.getItem('auth'));
        this.user = localStorage.getItem('user');
        makeAutoObservable(this)
    };

    setIsAuth(auth: boolean) {
        this.isAuth = auth;
    };

    setUser(user: string | null) {
        this.user = user;
    };
};

export default UserStore;