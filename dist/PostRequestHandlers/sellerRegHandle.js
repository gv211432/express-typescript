"use strict";
// =======================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.sellerRegHandle = void 0;
// importing the required modules
const All_Modules_1 = require("../All_Modules");
const Jwt_Token_1 = require("../Jwt_Token");
const Passport_Config_1 = require("../Passport_Config");
// =======================================================================
// ---------------------------------------------
// importing the required modules
// this validates all the field befor rechecked by the database ..
var seller_reg_validate = [
    All_Modules_1.check("firstName")
        .not()
        .isEmpty()
        .withMessage("Name can not be empty")
        .isLength({ min: 3 })
        .withMessage("Name must be at least 3 character."),
    All_Modules_1.check("phone")
        .isLength({ min: 10 })
        .not()
        .isEmpty()
        .withMessage("Password can not be empty")
        .withMessage("Phone number must be 10 digits."),
    All_Modules_1.check("email", "Email Address must be valid.")
        .not()
        .isEmpty()
        .withMessage("Email can not be empty")
        .isEmail()
        .trim()
        .escape()
        .normalizeEmail(),
    All_Modules_1.check("username").not().isEmpty().withMessage("username cannot be empty"),
    All_Modules_1.check("password")
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
];
// ---------------------------------------------(/seller_registration_handler)
// Handle the seller registration
All_Modules_1.router.post("/seller_registration_handler", Passport_Config_1.checkNotAuthSeller, seller_reg_validate, (req, res) => {
    console.log(req.body);
    //   On error just return the error message in the validation array up above..
    const errors = All_Modules_1.validationResult(req);
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
    // console.log(req.body);
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
                    username: req.body.username,
                    password: req.body.password,
                    hash: hash,
                };
                console.log(payload);
                // tryig to send the data to the graphql server to save to database..
                All_Modules_1.axios({
                    url: `${All_Modules_1.ENV_VAR.graphql_URL}`,
                    method: "post",
                    headers: {
                        authorization: `Bearer ${Jwt_Token_1.getJwtToken()}`,
                    },
                    data: {
                        query: `
                  query findSellerDetails{
                    sallerDetails(
                      where:{username:"${payload.username}"}
                    ){
                        seller_email
                        username
                    }
                  }`,
                    },
                })
                    .then(function (response1) {
                    // On sucessful..
                    console.log(response1.data.data.sallerDetails);
                    if (response1.data.data.sallerDetails.length == 0) {
                        // Sending the seller data to db for storage
                        // tryig to send the data to the graphql server to save to database..
                        All_Modules_1.axios({
                            url: `${All_Modules_1.ENV_VAR.graphql_URL}`,
                            method: "post",
                            headers: {
                                authorization: `Bearer ${Jwt_Token_1.getJwtToken()}`,
                            },
                            data: {
                                query: `
                                mutation setSellerDetails{
                                  createSallerDetail(
                                    input:{
                                      data:{
                                        firstName:"${payload.firstName}"
                                        lastName:"${payload.lastName}"
                                        phone:${payload.phone}
                                        seller_email:"${payload.email}"
                                        username:"${payload.username}"
                                        hash:"${payload.hash}"
                                        ac_active:false
                                        ac_blocked:false
                                      }
                                    }
                                  ){
                                    sallerDetail{
                                      firstName
                                      lastName
                                      phone
                                      seller_email
                                      username
                                      hash
                                      ac_active
                                      ac_blocked
                                    }
                                  }
                                }`,
                            },
                        })
                            .then(function (response2) {
                            // On sucessful..
                            console.log(response2.data.data.sallerDetails);
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
exports.sellerRegHandle = All_Modules_1.router;
//# sourceMappingURL=sellerRegHandle.js.map