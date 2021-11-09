// ┏━┓┏━┓┏━┓╺┳╸   ┏━┓┏━╸┏━┓╻ ╻┏━╸┏━┓╺┳╸┏━┓
// ┣━┛┃ ┃┗━┓ ┃    ┣┳┛┣╸ ┃┓┃┃ ┃┣╸ ┗━┓ ┃ ┗━┓
// ╹  ┗━┛┗━┛ ╹ ╺━╸╹┗╸┗━╸┗┻┛┗━┛┗━╸┗━┛ ╹ ┗━┛

// =======================================================================

// importing the required modules
import { router } from "./All_Modules";

// =======================================================================
// importing the post request routes for using in the main app
// const { getJwtToken } = require("./Jwt_Token");
import { sellerRegHandle } from "./PostRequestHandlers/sellerRegHandle";
import { sellerLoginHandle } from "./PostRequestHandlers/sellerLoginHandle";
import { salesPageHandle } from "./PostRequestHandlers/salesPageHandle";
import { newUserRegisterHandle } from "./PostRequestHandlers/newUserRegisterHandle";
import { signUpHandle } from "./PostRequestHandlers/signupHandle";
import { userLoginHandle } from "./PostRequestHandlers/loginHandle";
import { contactingHandle } from "./PostRequestHandlers/contactFormHandle";
import { uploadFileHandler } from "./PostRequestHandlers/uploadFileHandler";

// =======================================================================

router.use(sellerRegHandle);
router.use(sellerLoginHandle);
router.use(salesPageHandle);
router.use(newUserRegisterHandle);
router.use(signUpHandle);
router.use(userLoginHandle);
router.use(contactingHandle);
router.use(uploadFileHandler);

// =======================================================================
// exporting all the routs to be used by the main app..
export { router as Post_Requests };
