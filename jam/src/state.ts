import { atom } from "recoil";

const jwt_state = atom<string>({
    key: "jwt",
    default: ""
});

export {
    jwt_state
};