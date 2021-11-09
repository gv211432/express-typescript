// ==================== Importing varaibles ==============================
import {
  LocalStrategy,
  ENV_VAR,
  axios,
  bcrypt,
  express,
  passport,
} from "./All_Modules";
import * as GlobalData from "./GLOBAL_DATA";
import { getJwtToken } from "./Jwt_Token";

// ==================== Configuring passport with stratergies ==============
const passportConfig = (passport: passport.PassportStatic) => {
  // ====================================================================================
  // ┏┓╻┏━╸╻ ╻   ╻  ┏━┓┏━╸┏━┓╻     ╻ ╻┏━┓┏━╸┏━┓   ┏━┓╺┳╸┏━┓┏━┓╺┳╸┏━╸┏━┓┏━╸╻ ╻
  // ┃┗┫┣╸ ┃╻┃   ┃  ┃ ┃┃  ┣━┫┃     ┃ ┃┗━┓┣╸ ┣┳┛   ┗━┓ ┃ ┣┳┛┣━┫ ┃ ┣╸ ┣┳┛┃╺┓┗┳┛
  // ╹ ╹┗━╸┗┻┛   ┗━╸┗━┛┗━╸╹ ╹┗━╸   ┗━┛┗━┛┗━╸╹┗╸   ┗━┛ ╹ ╹┗╸╹ ╹ ╹ ┗━╸╹┗╸┗━┛ ╹
  passport.use(
    "new-user-local",
    new LocalStrategy(
      {
        usernameField: "order",
        passwordField: "email", // this is the virtual field on the model
      },
      function (order: string, email: string, done: Function) {
        // take order and email from the user
        // get the email form the database using order variable and match the email
        // on success let the user to create new account...
        // console.log("it is working");
        axios({
          url: `${ENV_VAR.graphql_URL}`,
          method: "post",
          headers: {
            authorization: `Bearer ${getJwtToken()}`,
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
            let resData: GlobalData.INewUserData =
              response1.data.data.salesInfos[0];

            // if resultant array of the query is empty means length is 0
            // that is given order variable is wrong
            if (response1.data.data.salesInfos.length == 0) {
              // returing the results
              return done(null, false, { message: "Wrong credentials!!" });
            } else {
              if (resData.email == email) {
                // console.log(resData);

                // if accountCreated variable on this connection in false
                // let the user to create new account..
                if (resData.accountCreated) {
                  // returing the results
                  return done(null, false, {
                    message:
                      "Account already created! Contact our team for help.",
                  });
                }

                // Saving this data to global varables..
                GlobalData.setNewUserData(resData);

                // this will execute on the success of this block's all validations..
                // registering the user in the session... and processing further
                return done(null, resData.id);
              } else {
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
      }
    )
  );

  // ====================================================================================
  // add other strategies for more authentication flexibility
  // ╻ ╻┏━┓┏━╸┏━┓   ╻  ┏━┓┏━╸┏━┓╻     ┏━┓╺┳╸┏━┓┏━┓╺┳╸┏━╸┏━┓┏━╸╻ ╻
  // ┃ ┃┗━┓┣╸ ┣┳┛╺━╸┃  ┃ ┃┃  ┣━┫┃     ┗━┓ ┃ ┣┳┛┣━┫ ┃ ┣╸ ┣┳┛┃╺┓┗┳┛
  // ┗━┛┗━┛┗━╸╹┗╸   ┗━╸┗━┛┗━╸╹ ╹┗━╸   ┗━┛ ╹ ╹┗╸╹ ╹ ╹ ┗━╸╹┗╸┗━┛ ╹
  passport.use(
    "user-local",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password", // this is the virtual field on the model
      },
      function (email: string, password: string, done: Function) {
        // console.log(email, password);
        axios({
          url: `${ENV_VAR.graphql_URL}`,
          method: "post",
          headers: {
            authorization: `Bearer ${getJwtToken()}`,
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
            if (
              response1.data.data.userInfos.length == 0 ||
              response1.data.data.credentials.length == 0
            ) {
              // returing the results
              return done(null, false, {
                message: "Email or password incorrect!",
              });
            } else {
              // Taking the first object in consideration form the array of the found data..
              // contains the validation info of the user
              let resData: {
                id: string;
                hash: string;
                active: boolean;
                blocked: boolean;
              } = response1.data.data.userInfos[0];
              // Contains personl info of the user
              let toSave: GlobalData.IUserData =
                response1.data.data.credentials[0];

              // console.log(toSave.docs);

              if (!resData.active) {
                // returing the results
                return done(null, false, {
                  message:
                    "This account is not active! Check our email to confirm your account",
                });
              }
              if (resData.blocked) {
                // returing the results
                return done(null, false, {
                  message:
                    "This account is locked, please contact our team for support.",
                });
              }

              //   console.log(resData.hash);
              // Password checking using the saved hash...
              bcrypt.compare(password, resData.hash, function (err, result) {
                // result == true
                if (result) {
                  // saving the user data in the global variable for use in other file..
                  GlobalData.setUserData(toSave);

                  // registering the user in the session... and processing further
                  // returing the results
                  return done(null, toSave.id);
                } else {
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
      }
    )
  );

  // ====================================================================================
  // ┏━┓┏━╸╻  ╻  ┏━╸┏━┓   ╻  ┏━┓┏━╸┏━┓╻     ┏━┓╺┳╸┏━┓┏━┓╺┳╸┏━╸┏━┓┏━╸╻ ╻
  // ┗━┓┣╸ ┃  ┃  ┣╸ ┣┳┛╺━╸┃  ┃ ┃┃  ┣━┫┃     ┗━┓ ┃ ┣┳┛┣━┫ ┃ ┣╸ ┣┳┛┃╺┓┗┳┛
  // ┗━┛┗━╸┗━╸┗━╸┗━╸╹┗╸   ┗━╸┗━┛┗━╸╹ ╹┗━╸   ┗━┛ ╹ ╹┗╸╹ ╹ ╹ ┗━╸╹┗╸┗━┛ ╹
  // this stratergy is for sellers on the seller login and sales page
  passport.use(
    "seller-local",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password", // this is the virtual field on the model
      },
      function (email: string, password: string, done: Function) {
        try {
          axios({
            url: `${ENV_VAR.graphql_URL}`,
            method: "post",
            headers: {
              authorization: `Bearer ${getJwtToken()}`,
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
              let resData: GlobalData.ISellerData =
                response1.data.data.sallerDetails[0];

              // if resultant array of the query is empty means length is 0
              // that is given order variable is wrong
              if (response1.data.data.sallerDetails.length == 0) {
                // returing the results
                return done(null, false, {
                  message: "Password or email incorrect!!",
                });
              } else {
                if (!resData.ac_active) {
                  // returing the results
                  return done(null, false, {
                    message:
                      "This account is not active! Check our email to confirm your account",
                  });
                }
                if (resData.ac_blocked) {
                  // returing the results
                  return done(null, false, {
                    message:
                      "This account is locked, please contact our team for support.",
                  });
                }
                //   console.log(resData.hash);
                // Password checking using the saved hash...
                bcrypt.compare(password, resData.hash, function (err, result) {
                  // result == true
                  if (result) {
                    // saving the user data in the global variable for use in other file..
                    GlobalData.setSellerData(resData);

                    // registering the user in the session... and processing further
                    // returing the results
                    return done(null, resData.seller_email);
                  } else {
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
        } catch (err) {
          return done(err);
        }
      }
    )
  );

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

const checkAuthSeller = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  try {
    if (
      req.user == GlobalData.getSellerData().seller_email &&
      req.isAuthenticated()
    ) {
      return next();
    }
  } catch (error) {}
  return res.redirect("/seller-login");
};

const checkNotAuthSeller = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  try {
    if (
      req.user == GlobalData.getSellerData().seller_email &&
      req.isAuthenticated()
    ) {
      return res.redirect("/seller-dashboard");
    }
  } catch (error) {}
  return next();
};

// ====================================================================================
const checkAuthUser = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  try {
    if (req.user == GlobalData.getUserData().id && req.isAuthenticated()) {
      return next();
    }
  } catch (error) {}
  return res.redirect("/login");
};

const checkNotAuthUser = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  try {
    if (req.user == GlobalData.getUserData().id && req.isAuthenticated()) {
      return res.redirect("/user-dashboard");
    }
  } catch (error) {}
  return next();
};

// ====================================================================================
const checkAuthNewUser = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  try {
    // console.log(req.user);
    // console.log(GlobalData.getNewUserData().id);
    if (req.user == GlobalData.getNewUserData().id && req.isAuthenticated()) {
      return next();
    }
  } catch (error) {}
  return res.redirect("/new-user");
};

const checkNotAuthNewUser = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  try {
    if (req.user == GlobalData.getNewUserData().id && req.isAuthenticated()) {
      return res.redirect("/sign_up");
    }
  } catch (error) {}
  return next();
};

// ====================================================================================
// ====================================================================================
// Exporiting in the standard mannar
export {
  passportConfig,
  checkAuthSeller,
  checkNotAuthSeller,
  checkAuthUser,
  checkNotAuthUser,
  checkAuthNewUser,
  checkNotAuthNewUser,
};
