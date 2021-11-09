"use strict";
// ┏━┓┏━┓┏━┓╺┳╸   ┏━┓┏━╸┏━┓╻ ╻┏━╸┏━┓╺┳╸┏━┓
// ┣━┛┃ ┃┗━┓ ┃    ┣┳┛┣╸ ┃┓┃┃ ┃┣╸ ┗━┓ ┃ ┗━┓
// ╹  ┗━┛┗━┛ ╹ ╺━╸╹┗╸┗━╸┗┻┛┗━┛┗━╸┗━┛ ╹ ┗━┛
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post_Requests = void 0;
// =======================================================================
// importing the required modules
const All_Modules_1 = require("./All_Modules");
Object.defineProperty(exports, "Post_Requests", { enumerable: true, get: function () { return All_Modules_1.router; } });
// =======================================================================
// importing the post request routes for using in the main app
// const { getJwtToken } = require("./Jwt_Token");
const sellerRegHandle_1 = require("./PostRequestHandlers/sellerRegHandle");
const sellerLoginHandle_1 = require("./PostRequestHandlers/sellerLoginHandle");
const salesPageHandle_1 = require("./PostRequestHandlers/salesPageHandle");
const newUserRegisterHandle_1 = require("./PostRequestHandlers/newUserRegisterHandle");
const signupHandle_1 = require("./PostRequestHandlers/signupHandle");
const loginHandle_1 = require("./PostRequestHandlers/loginHandle");
const contactFormHandle_1 = require("./PostRequestHandlers/contactFormHandle");
const uploadFileHandler_1 = require("./PostRequestHandlers/uploadFileHandler");
// =======================================================================
All_Modules_1.router.use(sellerRegHandle_1.sellerRegHandle);
All_Modules_1.router.use(sellerLoginHandle_1.sellerLoginHandle);
All_Modules_1.router.use(salesPageHandle_1.salesPageHandle);
All_Modules_1.router.use(newUserRegisterHandle_1.newUserRegisterHandle);
All_Modules_1.router.use(signupHandle_1.signUpHandle);
All_Modules_1.router.use(loginHandle_1.userLoginHandle);
All_Modules_1.router.use(contactFormHandle_1.contactingHandle);
All_Modules_1.router.use(uploadFileHandler_1.uploadFileHandler);
//# sourceMappingURL=POST_REQUESTS.js.map