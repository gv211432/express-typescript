"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginHandle = void 0;
// seller-login by past method..
// importing the required modules
const All_Modules_1 = require("../All_Modules");
const Passport_Config_1 = require("../Passport_Config");
// ---------------------------------------------
// importing the required modules
// this validates all the field before rechecked by the database ..
var user_login_validate = [
    (0, All_Modules_1.check)("email", "Email Address must be valid.")
        .not()
        .isEmpty()
        .withMessage("Email can not be empty")
        .isEmail()
        .trim()
        .escape(),
    (0, All_Modules_1.check)("password")
        .not()
        .isEmpty()
        .withMessage("Password can not be empty")
        .isLength({ min: 6 })
        .withMessage("Password Must Be at Least 8 Characters")
        .matches("[0-9]")
        .withMessage("Password Must Contain a Number")
        .matches("[A-Z]")
        .withMessage("Password Must Contain an Uppercase Letter")
        .trim()
        .escape(),
];
All_Modules_1.router.post("/login", user_login_validate, Passport_Config_1.checkNotAuthNewUser, Passport_Config_1.checkNotAuthUser, Passport_Config_1.checkNotAuthSeller, (req, res, next) => {
    All_Modules_1.passport.authenticate("user-local", {
        successRedirect: "/user-dashboard",
        failureRedirect: "/login",
        failureFlash: true,
    })(req, res, next);
});
exports.userLoginHandle = All_Modules_1.router;
//# sourceMappingURL=loginHandle.js.map