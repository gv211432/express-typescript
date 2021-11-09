"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpHandle = void 0;
// importing the required modules
const All_Modules_1 = require("../All_Modules");
const Jwt_Token_1 = require("../Jwt_Token");
const Passport_Config_1 = require("../Passport_Config");
// list for checking new signing accounts
var signup_validate = [
    (0, All_Modules_1.check)("email", "Username Must Be an Email Address")
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
        .isLength({ min: 8 })
        .withMessage("Password Must Be at Least 8 Characters")
        .matches("[0-9]")
        .withMessage("Password Must Contain a Number")
        .matches("[A-Z]")
        .withMessage("Password Must Contain an Uppercase Letter")
        .trim()
        .escape(),
    (0, All_Modules_1.check)("phone")
        .isLength({ min: 10 })
        .withMessage("Phone number must be 10 digits."),
    (0, All_Modules_1.check)("firstName")
        .not()
        .isEmpty()
        .withMessage("Name can not be empty")
        .isLength({ min: 4 })
        .withMessage("Name must be at least 4 character."),
    (0, All_Modules_1.check)("lastName")
        .isLength({ min: 2 })
        .withMessage("Name must be at least 2 character."),
];
All_Modules_1.router.post("/sign_up", Passport_Config_1.checkAuthNewUser, signup_validate, (req, res) => {
    console.log(req.body);
    //   On error just return the error message in the validation array up above..
    const errors = (0, All_Modules_1.validationResult)(req);
    if (!errors.isEmpty()) {
        // return res.status(200).send("Server issues, please try in some time..");
        let err = JSON.stringify(errors);
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
    // This defines how many times to hash the password
    let saltRounds = 10;
    try {
        All_Modules_1.bcrypt.genSalt(saltRounds, function (err, salt) {
            // console.log(salt);
            All_Modules_1.bcrypt.hash(req.body.password, salt, function (err, hash) {
                // console.log(hash);
                // Store hash in database here
                // Printign generate salt and hash..
                // console.log("The salt is: " + mySalt + " and hash is : " + myHash);
                let payload = {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    phone: req.body.phone,
                    email: req.body.email,
                    hash: hash,
                };
                console.log(payload);
                // tryig to send the data to the graphql server to save to database..
                (0, All_Modules_1.axios)({
                    url: `${All_Modules_1.ENV_VAR.graphql_URL}`,
                    method: "post",
                    headers: {
                        authorization: `Bearer ${(0, Jwt_Token_1.getJwtToken)()}`,
                    },
                    data: {
                        query: `
                  query findSellerDetails{
                    credentials(
                      where:{username:"${payload.email}"}
                    ){
                        id
                        username
                    }
                  }`,
                    },
                })
                    .then(function (response1) {
                    // On sucessful..
                    console.log(response1.data.data.credentials);
                    if (response1.data.data.credentials.length == 0) {
                        // Sending the seller data to db for storage
                        // tryig to send the data to the graphql server to save to database..
                        (0, All_Modules_1.axios)({
                            url: `${All_Modules_1.ENV_VAR.graphql_URL}`,
                            method: "post",
                            headers: {
                                authorization: `Bearer ${(0, Jwt_Token_1.getJwtToken)()}`,
                            },
                            data: {
                                query: `
                          mutation settingSomeData{
                            createCredential(
                              input:{
                                data:{
                                  firstName: "${payload.firstName}",
                                  lastName: "${payload.lastName}",
                                  phone: ${payload.phone},
                                  username: "${payload.email}"
                                  hash:"${payload.hash}"
                                }
                              }
                            ){
                              credential{
                              phone
                              firstName
                              lastName
                              username
                              hash
                              }
                            }
                            createUserInfo(input:{
                              data:{
                                  email: "${payload.email}",
                                  hash:"${payload.hash}",
                              }
                            }){
                              userInfo{
                                email
                                hash
                              }
                            }
                          }
                    `,
                            },
                        })
                            .then(function (response2) {
                            // On sucessful..
                            console.log(response2.data.data);
                            // If successful send the success message to user.
                            return res
                                .status(200)
                                .send("Congratulations!! Check your email to activate the account.");
                        })
                            .catch((error) => {
                            console.log(error);
                        });
                    }
                    else {
                        // If found array of user name exist means user already exists.
                        return res.status(200).send("Username already exists!!");
                    }
                })
                    .catch((error) => {
                    console.log(error.response);
                });
            });
        });
    }
    catch (err) {
        return res
            .status(200)
            .send("Something went wrong!! Please try again later.");
    }
});
exports.signUpHandle = All_Modules_1.router;
//# sourceMappingURL=signupHandle.js.map