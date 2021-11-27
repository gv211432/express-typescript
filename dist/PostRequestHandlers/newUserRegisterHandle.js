"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newUserData = exports.newUserRegisterHandle = void 0;
const All_Modules_1 = require("../All_Modules");
var new_user_validate = [
    All_Modules_1.check("email", "Email Address must be valid.")
        .not()
        .isEmpty()
        .withMessage("Email can not be empty")
        .isEmail()
        .trim()
        .escape()
        .normalizeEmail(),
    All_Modules_1.check("order")
        .not()
        .isEmpty()
        .matches("[0-9]")
        .withMessage("Order no. Must Contain a Number")
        .trim()
        .escape(),
];
let userData = "";
All_Modules_1.router.post("/new-user", (req, res, next) => {
    console.log("it is triggering..");
    All_Modules_1.passport.authenticate("new-user-local", {
        successRedirect: "/sign_up",
        failureRedirect: "/new-user",
        failureFlash: true,
    })(req, res, next);
});
exports.newUserRegisterHandle = All_Modules_1.router;
exports.newUserData = userData;
//# sourceMappingURL=newUserRegisterHandle.js.map