"use strict";
// ┏━╸╻  ┏━┓┏┓ ┏━┓╻     ╺┳┓┏━┓╺┳╸┏━┓
// ┃╺┓┃  ┃ ┃┣┻┓┣━┫┃      ┃┃┣━┫ ┃ ┣━┫
// ┗━┛┗━╸┗━┛┗━┛╹ ╹┗━╸   ╺┻┛╹ ╹ ╹ ╹ ╹
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNewUserData = exports.setNewUserData = exports.setUserDataImg = exports.setUserDataDocs = exports.getUserData = exports.setUserData = exports.getSellerData = exports.setSellerData = void 0;
let __sellerData = {
    ac_active: false,
    ac_blocked: false,
    firstName: "string",
    username: "string",
    lastName: "string",
    phone: 0,
    seller_email: "string",
    hash: "string",
    id: "string",
};
let setSellerData = (data) => {
    __sellerData = data;
};
exports.setSellerData = setSellerData;
let getSellerData = () => __sellerData;
exports.getSellerData = getSellerData;
let __userData = {
    id: "",
    username: "",
    firstName: "",
    lastName: "",
    phone: 0,
    address_line_1: "",
    address_line_2: "",
    address_line_3: "",
    userImg: {
        url: "",
        name: "",
        id: "",
    },
    docs: [],
};
let setUserData = (data) => {
    __userData = data;
};
exports.setUserData = setUserData;
let setUserDataDocs = (data) => {
    __userData.docs = data;
};
exports.setUserDataDocs = setUserDataDocs;
let setUserDataImg = (data) => {
    __userData.userImg = data;
};
exports.setUserDataImg = setUserDataImg;
let getUserData = () => __userData;
exports.getUserData = getUserData;
let __newUserData = {
    name: "string",
    email: "string",
    accountCreated: "string",
    id: "string",
};
let setNewUserData = (data) => {
    __newUserData = data;
};
exports.setNewUserData = setNewUserData;
let getNewUserData = () => __newUserData;
exports.getNewUserData = getNewUserData;
//# sourceMappingURL=GLOBAL_DATA.js.map