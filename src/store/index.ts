import { injectStores } from "@mobx-devtools/tools";

import UserStore from "./UserStore";
import CheckStore from "./CheckStore";

const userStore = new UserStore();
const checkStore = new CheckStore();

injectStores({
    userStore,
    checkStore,
});

export { userStore, checkStore };