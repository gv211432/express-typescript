"use strict";
// ┏━╸┏━╸╺┳╸   ┏━┓┏━╸┏━┓╻ ╻┏━╸┏━┓╺┳╸
// ┃╺┓┣╸  ┃    ┣┳┛┣╸ ┃┓┃┃ ┃┣╸ ┗━┓ ┃
// ┗━┛┗━╸ ╹ ╺━╸╹┗╸┗━╸┗┻┛┗━┛┗━╸┗━┛ ╹
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Get_Requests = void 0;
// =======================================================================
// importing the required modules
const All_Modules_1 = require("./All_Modules");
Object.defineProperty(exports, "Get_Requests", { enumerable: true, get: function () { return All_Modules_1.router; } });
// const { sellerData } = require("./PostRequestHandlers/sellerLoginHandle");
const GlobalData = __importStar(require("./GLOBAL_DATA"));
const PassportConfig = __importStar(require("./Passport_Config"));
const Jwt_Token_1 = require("./Jwt_Token");
// =======================================================================
// =======================================================================
// ┏━┓╻ ╻╺┳╸╻ ╻┏━╸┏┓╻╺┳╸╻┏━╸┏━┓╺┳╸┏━╸╺┳┓   ┏━┓┏━╸┏━╸╺┳╸╻┏━┓┏┓╻
// ┣━┫┃ ┃ ┃ ┣━┫┣╸ ┃┗┫ ┃ ┃┃  ┣━┫ ┃ ┣╸  ┃┃   ┗━┓┣╸ ┃   ┃ ┃┃ ┃┃┗┫
// ╹ ╹┗━┛ ╹ ╹ ╹┗━╸╹ ╹ ╹ ╹┗━╸╹ ╹ ╹ ┗━╸╺┻┛   ┗━┛┗━╸┗━╸ ╹ ╹┗━┛╹ ╹
// ---------------------------------------------(/sign_up)
// sending sales page for saving sales info get requests
All_Modules_1.router.get("/sign_up", PassportConfig.checkAuthNewUser, (req, res) => {
    res.render("Pages/signup-page");
});
// ---------------------------------------------
// ---------------------------------------------(/sales)
// sending saller page for login get requests
All_Modules_1.router.get("/sales", PassportConfig.checkAuthSeller, (req, res) => {
    res.render("Pages/sales-page");
});
// ---------------------------------------------
// // Handling singup form request
// router.get("/signupform", PassportConfig.checkNotAuthUser, function (req, res) {
//   res.render("Pages/signup-page");
// });
// handiling dashboards requests
// router.get("/user-dashboard", PassportConfig.checkAuthUser, (req, res) => {
//   res.render("Pages/user-dashboard", {
//     USER: GlobalData.getUserData(),
//   });
// });
// TODO this must be fixed
All_Modules_1.router.get("/user-dashboard", PassportConfig.checkAuthUser, (req, res) => {
    res.render("Dashboard/Dash-Pages/index", {
        USER: GlobalData.getUserData(),
    });
});
All_Modules_1.router.get("/gallery", PassportConfig.checkAuthUser, (req, res) => {
    res.sendFile(All_Modules_1.path.join(__dirname, "..", "Resources", "Gallery", "index.html"));
});
All_Modules_1.router.get("/modal", PassportConfig.checkAuthUser, (req, res) => {
    res.sendFile(All_Modules_1.path.join(__dirname, "..", "Resources", "Modal_jQuery", "index.html"));
});
All_Modules_1.router.get("/edit-profile", PassportConfig.checkAuthUser, (req, res) => {
    console.log(req.headers);
    console.log(req.headers["photo-id"]);
    // console.log(req.headers["account-id"]);
    let data;
    function getData() {
        return __awaiter(this, void 0, void 0, function* () {
            data = GlobalData.getUserData();
        });
    }
    getData().then(() => {
        switch (req.headers["cmd-mode"]) {
            case "change-user-img":
                All_Modules_1.axios({
                    url: `${All_Modules_1.ENV_VAR.graphql_URL}`,
                    method: "post",
                    headers: {
                        authorization: `Bearer ${Jwt_Token_1.getJwtToken()}`,
                    },
                    data: {
                        query: `
            mutation updateCrted{
              updateCredential(
                input:{
                  data:{
                    userImg:"${req.headers["photo-id"]}"
                  }
                  where:{id:"${data.id}"}
                }
              ){
                credential{
                  userImg{
                    id
                    name
                    url  
                  }
                }
              }
            }
            `,
                    },
                })
                    .then((result) => {
                    // console.log(result);
                    let payload = result.data.data.updateCredential.credential.userImg;
                    // console.log(data.docs);
                    // console.log(result.data.data.updateCredential.credential.userImg);
                    GlobalData.setUserDataImg(payload);
                    console.log("Image changed successfully");
                    res.status(200).send("ok");
                })
                    .catch((e) => {
                    res.status(400).json(e);
                });
                break;
            // this code access the delete api of graphql linked
            // with strapi and deletes the given id object
            case "delete-img":
                All_Modules_1.axios({
                    url: `${All_Modules_1.ENV_VAR.graphql_URL}`,
                    method: "post",
                    headers: {
                        authorization: `Bearer ${Jwt_Token_1.getJwtToken()}`,
                    },
                    data: {
                        query: `
            mutation files{
              deleteFile(
                input:{
                  where:{
                    id:"${req.headers["photo-id"]}"
                  }
                }
              ){
                file{
                  id
                }
              }
            }
            `,
                    },
                })
                    .then((result) => {
                    // console.log(result);
                    console.log("Image Deleted successfully");
                    res.status(200).send("ok");
                })
                    .catch((e) => {
                    res.status(400).json(e);
                });
                break;
            default:
                res.status(400).send("Error");
        }
    });
    // if(req.body.)
});
// router.get("/img", PassportConfig.checkAuthUser, (req, res) => {})
All_Modules_1.router.get("/img", PassportConfig.checkAuthUser, (req, res) => {
    // this field containd the main url of the image
    let url = "";
    let data;
    let toProceed = false;
    // Creating many async function to manage the execution of the codes
    // Trying to execute some codes one by one..
    // first getting the user data
    function getUrl() {
        return __awaiter(this, void 0, void 0, function* () {
            data = GlobalData.getUserData();
        });
    }
    // the deciding on the basis of the request query of mode
    function decided() {
        return __awaiter(this, void 0, void 0, function* () {
            getUrl().then(() => {
                switch (req.query.mode) {
                    case "user-img":
                        if (data.userImg) {
                            res.set("Content-Type", "image/jpeg");
                            url = `http://localhost:1337${data.userImg.url}`;
                            toProceed = true;
                        }
                        else {
                            res.sendFile(All_Modules_1.path.join(__dirname, "..", All_Modules_1.ENV_VAR.frontend_DIR, "broken.png"));
                            return;
                        }
                        break;
                    case "gallery":
                        res.set("Content-Type", "application/json");
                        All_Modules_1.axios({
                            url: `${All_Modules_1.ENV_VAR.graphql_URL}`,
                            method: "post",
                            headers: {
                                authorization: `Bearer ${Jwt_Token_1.getJwtToken()}`,
                            },
                            data: {
                                query: `
              query findDocs{
                credentials(
                  where:{
                    id:"${data.id}"
                  }
                ){
                  userImg{
                    url
                    id
                    size
                   }
                  docs{
                    id
                    name
                    size
                    height
                    width
                    mime
                    url 
                    formats
                  }
                }
              }
              `,
                            },
                        })
                            .then((result) => {
                            // console.log(result.data.data.credentials[0].docs);
                            // res.status(200).send(result.data.data.credentials.docs);
                            let payload = JSON.stringify(result.data.data.credentials[0].docs);
                            // console.log(data.docs);
                            // console.log(payload);
                            res.send(`{"urls":${payload}}`);
                        })
                            .catch((e) => {
                            res.status(400).json(e);
                        });
                        break;
                    default:
                        res.sendFile(All_Modules_1.path.join(__dirname, "..", All_Modules_1.ENV_VAR.frontend_DIR, "broken.png"));
                        return;
                }
            });
            return;
        });
    }
    // finally if the dicision is made executing the following code
    decided().then(() => {
        if (toProceed) {
            try {
                All_Modules_1.request({
                    url: url,
                    encoding: null,
                }, (err, resp, buffer) => {
                    if (!err && resp.statusCode === 200) {
                        return res.send(resp.body);
                    }
                    // if error is found following will execute
                    return res.sendFile(All_Modules_1.path.join(__dirname, "..", All_Modules_1.ENV_VAR.frontend_DIR, "broken.png"));
                });
            }
            catch (_a) {
                return res.sendFile(All_Modules_1.path.join(__dirname, "..", All_Modules_1.ENV_VAR.frontend_DIR, "broken.png"));
            }
        }
    });
});
All_Modules_1.router.get("/hi", (req, res) => {
    res.json({ hi: "hi" });
});
All_Modules_1.router.get("/upload/*", PassportConfig.checkAuthUser, (req, res) => {
    console.log(req.url);
    console.log(req.body);
    console.log(req.params);
    res.json({ success: true });
    // console.log(req.params.extraUrl);
    // res.send("Hi dude");
    // req
    //   .pipe(
    //     request({
    //       headers: {
    //         Authorization: `Bearer ${getJwtToken()}`,
    //       },
    //       qs: req.query,
    //       uri: `${ENV_VAR.strapi_HOST}:${ENV_VAR.strapi_PORT + req.url}`,
    //     })
    //   )
    //   .pipe(res);
});
All_Modules_1.router.get("/uploads/*", PassportConfig.checkAuthUser, (req, res) => {
    // console.log(req.url);
    // console.log(req.baseUrl);
    // console.log(req.subdomains);
    // console.log(req.params.extraUrl);
    // res.send("Hi dude");
    req
        .pipe(All_Modules_1.request({
        headers: {
            Authorization: `Bearer ${Jwt_Token_1.getJwtToken()}`,
        },
        qs: req.query,
        uri: `${All_Modules_1.ENV_VAR.strapi_HOST}:${All_Modules_1.ENV_VAR.strapi_PORT + req.url}`,
    }))
        .pipe(res);
});
// router.get("/uploads/:extraUrl/:cmd", (req, res, next) => {
//   console.log(req.url);
//   console.log(req.params.extraUrl);
//   // res.send("Hi dude");
//   req
//     .pipe(
//       request({
//         qs: req.query,
//         uri: `${ENV_VAR.strapi_HOST}:${
//           ENV_VAR.strapi_PORT +
//           req.baseUrl +
//           req.params.extraUrl +
//           req.params.cmd
//         }`,
//       })
//     )
//     .pipe(res);
//   next = () => {
//     console.log(res);
//   };
// });
// this route is for user profile..
All_Modules_1.router.get("/user-profile", PassportConfig.checkAuthUser, (req, res) => {
    res.render("Dashboard/Dash-Pages/profile", {
        USER: GlobalData.getUserData(),
    });
});
// ---------------------------------------------
All_Modules_1.router.get("/seller-dashboard", PassportConfig.checkAuthSeller, (req, res) => {
    // res.render("Pages/seller-dashboard", getSellerData());
    res.redirect("/sales");
});
// ---------------------------------------------
// ===========================================================================
// ===========================================================================
// ┏━┓╻ ╻┏┓ ╻  ╻┏━╸   ┏━┓┏━╸┏━╸╺┳╸╻┏━┓┏┓╻
// ┣━┛┃ ┃┣┻┓┃  ┃┃     ┗━┓┣╸ ┃   ┃ ┃┃ ┃┃┗┫
// ╹  ┗━┛┗━┛┗━╸╹┗━╸   ┗━┛┗━╸┗━╸ ╹ ╹┗━┛╹ ╹
// ---------------------------------------------(/)
// our main home page
All_Modules_1.router.get("/", PassportConfig.checkNotAuthUser, PassportConfig.checkNotAuthSeller, PassportConfig.checkNotAuthNewUser, function (req, res) {
    // res.set({
    //     'Access-control-Allow-Origin': '*'
    // });
    res.render("Pages/index");
});
// ---------------------------------------------
// ---------------------------------------------(/login)
// handling loginfor requests
All_Modules_1.router.get("/login", PassportConfig.checkNotAuthUser, PassportConfig.checkNotAuthSeller, PassportConfig.checkNotAuthNewUser, function (req, res) {
    res.render("Pages/login-page");
});
// ---------------------------------------------
// ---------------------------------------------(/seller-login)
// Handling signup get requests
// if its not an authenticated seller server the page
All_Modules_1.router.get("/seller-login", PassportConfig.checkNotAuthUser, PassportConfig.checkNotAuthSeller, PassportConfig.checkNotAuthNewUser, (req, res) => {
    res.render("Pages/seller-login");
});
// ---------------------------------------------
// ---------------------------------------------(/seller-regester)
// sending the saller register request
All_Modules_1.router.get("/seller-register", PassportConfig.checkNotAuthUser, PassportConfig.checkNotAuthSeller, PassportConfig.checkNotAuthNewUser, (req, res) => {
    res.render(`Pages/seller-regester`);
});
// ---------------------------------------------
// ---------------------------------------------
// New user regesteration get request..
All_Modules_1.router.get("/new-user", PassportConfig.checkNotAuthNewUser, PassportConfig.checkNotAuthUser, PassportConfig.checkNotAuthSeller, (req, res) => {
    res.render("Pages/new-user-register");
});
// ---------------------------------------------
// ---------------------------------------------
// handling logout requests
All_Modules_1.router.get("/logout", (req, res) => {
    req.logout();
    return res.redirect("/");
});
// ---------------------------------------------
// ---------------------------------------------
// 404 error handling
All_Modules_1.router.get("*", (req, res) => {
    res.render("Pages/not-found-page");
});
//# sourceMappingURL=GET_REQUEST.js.map