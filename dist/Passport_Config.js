"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkNotAuthNewUser = exports.checkAuthNewUser = exports.checkNotAuthUser = exports.checkAuthUser = exports.checkNotAuthSeller = exports.checkAuthSeller = exports.passportConfig = void 0;
// ==================== Importing varaibles ==============================
const All_Modules_1 = require("./All_Modules");
const GlobalData = __importStar(require("./GLOBAL_DATA"));
const Jwt_Token_1 = require("./Jwt_Token");
// ==================== Configuring passport with stratergies ==============
const passportConfig = (passport) => {
    // ====================================================================================
    // ┏┓╻┏━╸╻ ╻   ╻  ┏━┓┏━╸┏━┓╻     ╻ ╻┏━┓┏━╸┏━┓   ┏━┓╺┳╸┏━┓┏━┓╺┳╸┏━╸┏━┓┏━╸╻ ╻
    // ┃┗┫┣╸ ┃╻┃   ┃  ┃ ┃┃  ┣━┫┃     ┃ ┃┗━┓┣╸ ┣┳┛   ┗━┓ ┃ ┣┳┛┣━┫ ┃ ┣╸ ┣┳┛┃╺┓┗┳┛
    // ╹ ╹┗━╸┗┻┛   ┗━╸┗━┛┗━╸╹ ╹┗━╸   ┗━┛┗━┛┗━╸╹┗╸   ┗━┛ ╹ ╹┗╸╹ ╹ ╹ ┗━╸╹┗╸┗━┛ ╹
    passport.use("new-user-local", new All_Modules_1.LocalStrategy({
        usernameField: "order",
        passwordField: "email", // this is the virtual field on the model
    }, function (order, email, done) {
        // take order and email from the user
        // get the email form the database using order variable and match the email
        // on success let the user to create new account...
        // console.log("it is working");
        (0, All_Modules_1.axios)({
            url: `${All_Modules_1.ENV_VAR.graphql_URL}`,
            method: "post",
            headers: {
                authorization: `Bearer ${(0, Jwt_Token_1.getJwtToken)()}`,
            },
            data: {
                query: `
              query findSalesInfo{
                salesInfos(where:{
                  cumulativeOrderNo:${order}
                }){
                  name
                  email
                  accountCreated
                  id
                }
              }
            `,
            },
        })
            .then(function (response1) {
            // On sucessful..
            // console.log(response1.data.data);
            // Taking the first object in consideration form the array of the found data..
            let resData = response1.data.data.salesInfos[0];
            // if resultant array of the query is empty means length is 0
            // that is given order variable is wrong
            if (response1.data.data.salesInfos.length == 0) {
                // returing the results
                return done(null, false, { message: "Wrong credentials!!" });
            }
            else {
                if (resData.email == email) {
                    // console.log(resData);
                    // if accountCreated variable on this connection in false
                    // let the user to create new account..
                    if (resData.accountCreated) {
                        // returing the results
                        return done(null, false, {
                            message: "Account already created! Contact our team for help.",
                        });
                    }
                    // Saving this data to global varables..
                    GlobalData.setNewUserData(resData);
                    // this will execute on the success of this block's all validations..
                    // registering the user in the session... and processing further
                    return done(null, resData.id);
                }
                else {
                    // if given email does not match, return false
                    // which will stop the account creation process
                    return done(null, false, { message: "Wrong credentials!!" });
                }
            }
        })
            .catch((error) => {
            // returing the results of error
            return done(error);
        });
    }));
    // ====================================================================================
    // add other strategies for more authentication flexibility
    // ╻ ╻┏━┓┏━╸┏━┓   ╻  ┏━┓┏━╸┏━┓╻     ┏━┓╺┳╸┏━┓┏━┓╺┳╸┏━╸┏━┓┏━╸╻ ╻
    // ┃ ┃┗━┓┣╸ ┣┳┛╺━╸┃  ┃ ┃┃  ┣━┫┃     ┗━┓ ┃ ┣┳┛┣━┫ ┃ ┣╸ ┣┳┛┃╺┓┗┳┛
    // ┗━┛┗━┛┗━╸╹┗╸   ┗━╸┗━┛┗━╸╹ ╹┗━╸   ┗━┛ ╹ ╹┗╸╹ ╹ ╹ ┗━╸╹┗╸┗━┛ ╹
    passport.use("user-local", new All_Modules_1.LocalStrategy({
        usernameField: "email",
        passwordField: "password", // this is the virtual field on the model
    }, function (email, password, done) {
        // console.log(email, password);
        (0, All_Modules_1.axios)({
            url: `${All_Modules_1.ENV_VAR.graphql_URL}`,
            method: "post",
            headers: {
                authorization: `Bearer ${(0, Jwt_Token_1.getJwtToken)()}`,
            },
            data: {
                query: `
                      query findUserInfo{
                        userInfos(
                          where:{email:"${email}"}
                        ){
                            id
                            hash
                            active
                            blocked
                        }
                        credentials(
                          where:{
                            username:"${email}"
                          }
                        ){
                          id
                          username
                          firstName
                          lastName	
                          phone
                          address_line_1
                          address_line_2
                          address_line_3
                          userImg{
                            id
                            url
                            name
                          }
                          docs{
                            id
                            url
                            name
                            size
                            width
                            height
                            mime
                            formats
                          }
                        }
                      }
            `,
            },
        })
            .then(function (response1) {
            // On sucessful..
            // console.log(response1.data.data);
            // return done(null, false, { message: "Done.." });
            // if resultant array of the query is empty means length is 0
            // that is given order variable is wrong
            if (response1.data.data.userInfos.length == 0 ||
                response1.data.data.credentials.length == 0) {
                // returing the results
                return done(null, false, {
                    message: "Email or password incorrect!",
                });
            }
            else {
                // Taking the first object in consideration form the array of the found data..
                // contains the validation info of the user
                let resData = response1.data.data.userInfos[0];
                // Contains personl info of the user
                let toSave = response1.data.data.credentials[0];
                // console.log(toSave.docs);
                if (!resData.active) {
                    // returing the results
                    return done(null, false, {
                        message: "This account is not active! Check our email to confirm your account",
                    });
                }
                if (resData.blocked) {
                    // returing the results
                    return done(null, false, {
                        message: "This account is locked, please contact our team for support.",
                    });
                }
                //   console.log(resData.hash);
                // Password checking using the saved hash...
                All_Modules_1.bcrypt.compare(password, resData.hash, function (err, result) {
                    // result == true
                    if (result) {
                        // saving the user data in the global variable for use in other file..
                        GlobalData.setUserData(toSave);
                        // registering the user in the session... and processing further
                        // returing the results
                        return done(null, toSave.id);
                    }
                    else {
                        // returing the results
                        return done(null, false);
                    }
                });
            }
        })
            .catch((error) => {
            // console.log(error.response);
            // returing the results of error
            return done(error);
        });
    }));
    // ====================================================================================
    // ┏━┓┏━╸╻  ╻  ┏━╸┏━┓   ╻  ┏━┓┏━╸┏━┓╻     ┏━┓╺┳╸┏━┓┏━┓╺┳╸┏━╸┏━┓┏━╸╻ ╻
    // ┗━┓┣╸ ┃  ┃  ┣╸ ┣┳┛╺━╸┃  ┃ ┃┃  ┣━┫┃     ┗━┓ ┃ ┣┳┛┣━┫ ┃ ┣╸ ┣┳┛┃╺┓┗┳┛
    // ┗━┛┗━╸┗━╸┗━╸┗━╸╹┗╸   ┗━╸┗━┛┗━╸╹ ╹┗━╸   ┗━┛ ╹ ╹┗╸╹ ╹ ╹ ┗━╸╹┗╸┗━┛ ╹
    // this stratergy is for sellers on the seller login and sales page
    passport.use("seller-local", new All_Modules_1.LocalStrategy({
        usernameField: "email",
        passwordField: "password", // this is the virtual field on the model
    }, function (email, password, done) {
        try {
            (0, All_Modules_1.axios)({
                url: `${All_Modules_1.ENV_VAR.graphql_URL}`,
                method: "post",
                headers: {
                    authorization: `Bearer ${(0, Jwt_Token_1.getJwtToken)()}`,
                },
                data: {
                    query: `
                        query findSellerDetails{
                          sallerDetails(
                            where:{seller_email:"${email}"}
                          ){
                              ac_active
                              ac_blocked
                              firstName
                              username
                              lastName
                              phone
                              seller_email
                              hash
                              id
                          }
                        }`,
                },
            })
                .then(function (response1) {
                // On sucessful..
                // console.log(response1.data.data.sallerDetails);
                // Taking the first object in consideration form the array of the found data..
                let resData = response1.data.data.sallerDetails[0];
                // if resultant array of the query is empty means length is 0
                // that is given order variable is wrong
                if (response1.data.data.sallerDetails.length == 0) {
                    // returing the results
                    return done(null, false, {
                        message: "Password or email incorrect!!",
                    });
                }
                else {
                    if (!resData.ac_active) {
                        // returing the results
                        return done(null, false, {
                            message: "This account is not active! Check our email to confirm your account",
                        });
                    }
                    if (resData.ac_blocked) {
                        // returing the results
                        return done(null, false, {
                            message: "This account is locked, please contact our team for support.",
                        });
                    }
                    //   console.log(resData.hash);
                    // Password checking using the saved hash...
                    All_Modules_1.bcrypt.compare(password, resData.hash, function (err, result) {
                        // result == true
                        if (result) {
                            // saving the user data in the global variable for use in other file..
                            GlobalData.setSellerData(resData);
                            // registering the user in the session... and processing further
                            // returing the results
                            return done(null, resData.seller_email);
                        }
                        else {
                            // returing the results
                            return done(null, false, {
                                message: "Password or email incorrect",
                            });
                        }
                    });
                }
            })
                .catch((error) => {
                // console.log(error.response);
                // returing the results of error
                return done(error);
            });
        }
        catch (err) {
            return done(err);
        }
    }));
    // ====================================================================================
    // saving(serializing) the anthenticated user for authenticated login
    // this is done by following api
    // and on logout the user my be deleted from autheticated list that is deserialization
    passport.serializeUser((user, done) => {
        // console.log("User serialize >>>> ", user);
        // done(null, GlobalData.getSellerData().seller_email);
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        // console.log("User deserialize >>>>> ", user);
        // done(null, GlobalData.getSellerData().seller_email);
        done(null, user);
    });
};
exports.passportConfig = passportConfig;
// ====================================================================================
// ====================================================================================
// this is check middleware function for sellers
// if they are already logedIn, they will not sent a seller-login page again
// but direct login..
// interface IAuthFunction {
//   req: express.Request;
//   res: express.Response;
//   next: Function;
// }
const checkAuthSeller = (req, res, next) => {
    try {
        if (req.user == GlobalData.getSellerData().seller_email &&
            req.isAuthenticated()) {
            return next();
        }
    }
    catch (error) { }
    return res.redirect("/seller-login");
};
exports.checkAuthSeller = checkAuthSeller;
const checkNotAuthSeller = (req, res, next) => {
    try {
        if (req.user == GlobalData.getSellerData().seller_email &&
            req.isAuthenticated()) {
            return res.redirect("/seller-dashboard");
        }
    }
    catch (error) { }
    return next();
};
exports.checkNotAuthSeller = checkNotAuthSeller;
// ====================================================================================
const checkAuthUser = (req, res, next) => {
    try {
        if (req.user == GlobalData.getUserData().id && req.isAuthenticated()) {
            return next();
        }
    }
    catch (error) { }
    return res.redirect("/login");
};
exports.checkAuthUser = checkAuthUser;
const checkNotAuthUser = (req, res, next) => {
    try {
        if (req.user == GlobalData.getUserData().id && req.isAuthenticated()) {
            return res.redirect("/user-dashboard");
        }
    }
    catch (error) { }
    return next();
};
exports.checkNotAuthUser = checkNotAuthUser;
// ====================================================================================
const checkAuthNewUser = (req, res, next) => {
    try {
        // console.log(req.user);
        // console.log(GlobalData.getNewUserData().id);
        if (req.user == GlobalData.getNewUserData().id && req.isAuthenticated()) {
            return next();
        }
    }
    catch (error) { }
    return res.redirect("/new-user");
};
exports.checkAuthNewUser = checkAuthNewUser;
const checkNotAuthNewUser = (req, res, next) => {
    try {
        if (req.user == GlobalData.getNewUserData().id && req.isAuthenticated()) {
            return res.redirect("/sign_up");
        }
    }
    catch (error) { }
    return next();
};
exports.checkNotAuthNewUser = checkNotAuthNewUser;
//# sourceMappingURL=Passport_Config.js.map