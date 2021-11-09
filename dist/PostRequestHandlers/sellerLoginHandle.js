"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sellerLoginHandle = void 0;
// seller-login by past method..
// importing the required modules
const All_Modules_1 = require("../All_Modules");
// ---------------------------------------------
// importing the required modules
// this validates all the field before rechecked by the database ..
var seller_login_validate = [
    (0, All_Modules_1.check)("email", "Email Address must be valid.")
        .not()
        .isEmpty()
        .withMessage("Email can not be empty")
        .isEmail()
        .trim()
        .escape()
        .normalizeEmail(),
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
All_Modules_1.router.post("/seller-login", seller_login_validate, (req, res, next) => {
    All_Modules_1.passport.authenticate("seller-local", {
        successRedirect: "/seller-dashboard",
        failureRedirect: "/seller-login",
        failureFlash: true,
    })(req, res, next);
    // passport.authenticate("seller-local", function (err, user, info) {
    //   if (err) {
    //     return next(err);
    //   }
    //   if (!user) {
    //     return res.render("Pages/seller-login", { messages: info.messages });
    //   }
    //   req.logIn(user, function (err) {
    //     if (err) {
    //       return next(err);
    //     }
    //     return res.redirect("/dashboard");
    //   });
    // })(req, res, next);
});
exports.sellerLoginHandle = All_Modules_1.router;
//# sourceMappingURL=sellerLoginHandle.js.map