import {
  router,
  axios,
  bcrypt,
  ENV_VAR,
  check,
  validationResult,
  passport,
  flash,
} from "../All_Modules";
import { getJwtToken } from "../Jwt_Token";

var new_user_validate = [
  check("email", "Email Address must be valid.")
    .not()
    .isEmpty()
    .withMessage("Email can not be empty")
    .isEmail()
    .trim()
    .escape()
    .normalizeEmail(),
  check("order")
    .not()
    .isEmpty()
    .matches("[0-9]")
    .withMessage("Order no. Must Contain a Number")
    .trim()
    .escape(),
];

let userData = "";

router.post("/new-user", (req, res, next) => {
  console.log("it is triggering..");
  passport.authenticate("new-user-local", {
    successRedirect: "/sign_up",
    failureRedirect: "/new-user",
    failureFlash: true,
  })(req, res, next);
});

export const newUserRegisterHandle = router;
export const newUserData = userData;
