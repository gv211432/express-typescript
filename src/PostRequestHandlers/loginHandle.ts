// seller-login by past method..
// importing the required modules
import {
  router,
  axios,
  bcrypt,
  ENV_VAR,
  check,
  validationResult,
  passport,
  flash,
  express,
} from "../All_Modules";
import { getJwtToken } from "../Jwt_Token";
import {
  checkNotAuthNewUser,
  checkNotAuthUser,
  checkNotAuthSeller,
} from "../Passport_Config";

// ---------------------------------------------
// importing the required modules
// this validates all the field before rechecked by the database ..
var user_login_validate = [
  check("email", "Email Address must be valid.")
    .not()
    .isEmpty()
    .withMessage("Email can not be empty")
    .isEmail()
    .trim()
    .escape(),

  check("password")
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

router.post(
  "/login",
  user_login_validate,
  checkNotAuthNewUser,
  checkNotAuthUser,
  checkNotAuthSeller,
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    passport.authenticate("user-local", {
      successRedirect: "/user-dashboard",
      failureRedirect: "/login",
      failureFlash: true,
    })(req, res, next);
  }
);

export const userLoginHandle = router;
