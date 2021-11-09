"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactingHandle = void 0;
// importing the required modules
const All_Modules_1 = require("../All_Modules");
const Jwt_Token_1 = require("../Jwt_Token");
// const PassportConfig = require("../Passport_Config");
// Validation for Handling form for contact purpose
var contactingvalidate = [
    (0, All_Modules_1.check)("email", "Email must be in proper format.")
        .not()
        .isEmpty()
        .withMessage("Email can not be empty")
        .isEmail()
        .trim()
        .escape(),
    (0, All_Modules_1.check)("subject")
        .not()
        .isEmpty()
        .withMessage("Subject can not be empty")
        .trim()
        .escape(),
    (0, All_Modules_1.check)("message")
        .isLength({ min: 10, max: 1000 })
        .not()
        .isEmpty()
        .withMessage("Message can not be empty"),
    (0, All_Modules_1.check)("name")
        .not()
        .isEmpty()
        .withMessage("Name can not be empty")
        .isLength({ min: 2, max: 100 })
        .withMessage("Name must be at least 4 to 100 character."),
];
// writing into database for contacting people
All_Modules_1.router.post("/forms/contact", contactingvalidate, (req, res) => {
    //   On error just return the error message in the validation array up above..
    const errors = (0, All_Modules_1.validationResult)(req);
    if (!errors.isEmpty()) {
        // return res.status(200).send("Server issues, please try in some time..");
        let err = JSON.stringify(errors);
        // Creating an object of the error object..
        let errObj = JSON.parse(err);
        // console.log(errObj.errors[0]["msg"]);
        return res
            .status(200)
            .send("Problem with the " +
            errObj.errors[0]["param"] +
            " field.\n" +
            errObj.errors[0]["msg"]);
    }
    // If error is not found, then proceding further..
    // console.log(req.body);
    let payload = {
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message,
    };
    (0, All_Modules_1.axios)({
        url: `${All_Modules_1.ENV_VAR.graphql_URL}`,
        method: "post",
        headers: {
            authorization: `Bearer ${(0, Jwt_Token_1.getJwtToken)()}`,
        },
        data: {
            query: `
        mutation creatingNewContact{
          createContacting(input:{
            data:{
              name:"${payload.name}"
              email:"${payload.email}"
              subject:"${payload.subject}"
              message:"${payload.message}"
            }
          }){
            contacting{
              name
              email
              subject
              message
            }
          }
        }
      `,
        },
    })
        .then((result) => {
        // console.log(result.status);
        // If status is 200 means everything was fine..
        if (result.status == 200) {
            res
                .status(200)
                .send("Your response is save. We will be back to you as soon as possible :)");
        }
    })
        .catch((error) => {
        // On error retrun the error message
        res.status(200).send("Unable to save the response...");
    });
});
exports.contactingHandle = All_Modules_1.router;
//# sourceMappingURL=contactFormHandle.js.map