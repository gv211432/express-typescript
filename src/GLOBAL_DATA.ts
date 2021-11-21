// ┏━╸╻  ┏━┓┏┓ ┏━┓╻     ╺┳┓┏━┓╺┳╸┏━┓
// ┃╺┓┃  ┃ ┃┣┻┓┣━┫┃      ┃┃┣━┫ ┃ ┣━┫
// ┗━┛┗━╸┗━┛┗━┛╹ ╹┗━╸   ╺┻┛╹ ╹ ╹ ╹ ╹

// this file facilitates the serving some global data across the files
// this contains the logged in users, sellers and new users.

// thsi contain seller data

interface ISellerData {
  ac_active: boolean;
  ac_blocked: boolean;
  firstName: string;
  username: string;
  lastName: string;
  phone: number;
  seller_email: string;
  hash: string;
  id: string;
}

let __sellerData: ISellerData = {
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
let setSellerData = (data: ISellerData) => {
  __sellerData = data;
};
let getSellerData = (): ISellerData => __sellerData;

// ===================================================================

// this contains the user data..
interface IUserData {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  phone: number;
  address_line_1: string;
  address_line_2: string;
  address_line_3: string;
  userImg?: {
    id: string;
    name: string;
    url: string;
  };
  docs?: any[];
}

let __userData: IUserData = {
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

let setUserData = (data: IUserData) => {
  __userData = data;
};

let setUserDataDocs = (data: any[]) => {
  __userData.docs = data;
};

let setUserDataImg = (data: { id: string; name: string; url: string }) => {
  __userData.userImg = data;
};
let getUserData = (): IUserData => __userData;

// ===================================================================

// and this contains the new user data.

interface INewUserData {
  name: string;
  email: string;
  accountCreated: string;
  id: string;
}

let __newUserData: INewUserData = {
  name: "string",
  email: "string",
  accountCreated: "string",
  id: "string",
};
let setNewUserData = (data: INewUserData) => {
  __newUserData = data;
};
let getNewUserData = (): INewUserData => __newUserData;

// standard exports of the apis
export {
  setSellerData,
  getSellerData,
  ISellerData,
  setUserData,
  getUserData,
  setUserDataDocs,
  setUserDataImg,
  IUserData,
  setNewUserData,
  getNewUserData,
  INewUserData,
};
