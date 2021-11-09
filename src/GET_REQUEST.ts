// ┏━╸┏━╸╺┳╸   ┏━┓┏━╸┏━┓╻ ╻┏━╸┏━┓╺┳╸
// ┃╺┓┣╸  ┃    ┣┳┛┣╸ ┃┓┃┃ ┃┣╸ ┗━┓ ┃
// ┗━┛┗━╸ ╹ ╺━╸╹┗╸┗━╸┗┻┛┗━┛┗━╸┗━┛ ╹

// =======================================================================
// importing the required modules
import { router, express, path, request, ENV_VAR } from "./All_Modules";
// const { sellerData } = require("./PostRequestHandlers/sellerLoginHandle");
import * as GlobalData from "./GLOBAL_DATA";
import * as PassportConfig from "./Passport_Config";
import { getJwtToken } from "./Jwt_Token";

// =======================================================================
// =======================================================================
// ┏━┓╻ ╻╺┳╸╻ ╻┏━╸┏┓╻╺┳╸╻┏━╸┏━┓╺┳╸┏━╸╺┳┓   ┏━┓┏━╸┏━╸╺┳╸╻┏━┓┏┓╻
// ┣━┫┃ ┃ ┃ ┣━┫┣╸ ┃┗┫ ┃ ┃┃  ┣━┫ ┃ ┣╸  ┃┃   ┗━┓┣╸ ┃   ┃ ┃┃ ┃┃┗┫
// ╹ ╹┗━┛ ╹ ╹ ╹┗━╸╹ ╹ ╹ ╹┗━╸╹ ╹ ╹ ┗━╸╺┻┛   ┗━┛┗━╸┗━╸ ╹ ╹┗━┛╹ ╹

// ---------------------------------------------(/sign_up)
// sending sales page for saving sales info get requests
router.get("/sign_up", PassportConfig.checkAuthNewUser, (req, res) => {
  res.render("Pages/signup-page");
});
// ---------------------------------------------

// ---------------------------------------------(/sales)
// sending saller page for login get requests
router.get("/sales", PassportConfig.checkAuthSeller, (req, res) => {
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
router.get("/user-dashboard", PassportConfig.checkAuthUser, (req, res) => {
  res.render("Dashboard/Dash-Pages/index", {
    USER: GlobalData.getUserData(),
  });
});

router.get("/gallery", PassportConfig.checkAuthUser, (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "Resources", "Gallery", "index.html")
  );
});

router.get("/modal", PassportConfig.checkAuthUser, (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "Resources", "Modal_jQuery", "index.html")
  );
});
// router.get("/img", PassportConfig.checkAuthUser, (req, res) => {})
router.get("/img", PassportConfig.checkAuthUser, (req, res) => {
  // this field containd the main url of the image
  let url = "";
  let data: GlobalData.IUserData;
  let toProceed = false;

  // Creating many async function to manage the execution of the codes
  // Trying to execute some codes one by one..

  // first getting the user data
  async function getUrl() {
    data = GlobalData.getUserData();
  }

  // the deciding on the basis of the request query of mode
  async function decided() {
    getUrl().then(() => {
      if (data.userImg) {
        switch (req.query.mode) {
          case "user-img":
            res.set("Content-Type", "image/jpeg");
            url = `http://localhost:1337${data.userImg.url}`;
            toProceed = true;
            break;
          case "gallery":
            res.set("Content-Type", "application/json");
            let payload = JSON.stringify(data.docs);
            // console.log(data.docs);
            // console.log(payload);
            res.send(`{"urls":${payload}}`);
            return false;
          default:
            res.sendFile(
              path.join(__dirname, "..", ENV_VAR.frontend_DIR, "broken.png")
            );
            return;
        }
      } else {
        res.sendFile(
          path.join(__dirname, "..", ENV_VAR.frontend_DIR, "broken.png")
        );
        return;
      }
    });
    return;
  }

  // finally if the dicision is made executing the following code
  decided().then(() => {
    if (toProceed) {
      try {
        request(
          {
            url: url,
            encoding: null,
          },
          (err, resp, buffer) => {
            if (!err && resp.statusCode === 200) {
              return res.send(resp.body);
            }
            // if error is found following will execute
            return res.sendFile(
              path.join(__dirname, "..", ENV_VAR.frontend_DIR, "broken.png")
            );
          }
        );
      } catch {
        return res.sendFile(
          path.join(__dirname, "..", ENV_VAR.frontend_DIR, "broken.png")
        );
      }
    }
  });
});

router.get("/hi", (req, res) => {
  res.json({ hi: "hi" });
});

router.get("/upload/*", (req, res) => {
  console.log(req.url);
  // console.log(req.params.extraUrl);
  // res.send("Hi dude");
  req
    .pipe(
      request({
        headers: {
          Authorization: `Bearer ${getJwtToken()}`,
        },
        qs: req.query,
        uri: `${ENV_VAR.strapi_HOST}:${ENV_VAR.strapi_PORT + req.url}`,
      })
    )
    .pipe(res);
});

router.get("/uploads/*", (req, res) => {
  // console.log(req.url);
  // console.log(req.baseUrl);
  // console.log(req.subdomains);
  // console.log(req.params.extraUrl);
  // res.send("Hi dude");
  req
    .pipe(
      request({
        headers: {
          Authorization: `Bearer ${getJwtToken()}`,
        },
        qs: req.query,
        uri: `${ENV_VAR.strapi_HOST}:${ENV_VAR.strapi_PORT + req.url}`,
      })
    )
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
router.get("/user-profile", PassportConfig.checkAuthUser, (req, res) => {
  res.render("Dashboard/Dash-Pages/profile", {
    USER: GlobalData.getUserData(),
  });
});

// ---------------------------------------------
router.get("/seller-dashboard", PassportConfig.checkAuthSeller, (req, res) => {
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
router.get(
  "/",
  PassportConfig.checkNotAuthUser,
  PassportConfig.checkNotAuthSeller,
  PassportConfig.checkNotAuthNewUser,
  function (req, res) {
    // res.set({
    //     'Access-control-Allow-Origin': '*'
    // });
    res.render("Pages/index");
  }
);
// ---------------------------------------------

// ---------------------------------------------(/login)
// handling loginfor requests
router.get(
  "/login",
  PassportConfig.checkNotAuthUser,
  PassportConfig.checkNotAuthSeller,
  PassportConfig.checkNotAuthNewUser,
  function (req, res) {
    res.render("Pages/login-page");
  }
);
// ---------------------------------------------

// ---------------------------------------------(/seller-login)
// Handling signup get requests
// if its not an authenticated seller server the page
router.get(
  "/seller-login",
  PassportConfig.checkNotAuthUser,
  PassportConfig.checkNotAuthSeller,
  PassportConfig.checkNotAuthNewUser,
  (req, res) => {
    res.render("Pages/seller-login");
  }
);
// ---------------------------------------------

// ---------------------------------------------(/seller-regester)
// sending the saller register request
router.get(
  "/seller-register",
  PassportConfig.checkNotAuthUser,
  PassportConfig.checkNotAuthSeller,
  PassportConfig.checkNotAuthNewUser,
  (req, res) => {
    res.render(`Pages/seller-regester`);
  }
);
// ---------------------------------------------

// ---------------------------------------------
// New user regesteration get request..
router.get(
  "/new-user",
  PassportConfig.checkNotAuthNewUser,
  PassportConfig.checkNotAuthUser,
  PassportConfig.checkNotAuthSeller,
  (req, res) => {
    res.render("Pages/new-user-register");
  }
);
// ---------------------------------------------

// ---------------------------------------------
// handling logout requests
router.get("/logout", (req, res) => {
  req.logout();
  return res.redirect("/");
});
// ---------------------------------------------

// ---------------------------------------------
// 404 error handling
router.get("*", (req, res) => {
  res.render("Pages/not-found-page");
});
// ---------------------------------------------

// ===========================================================================
// ===========================================================================

// ---------------------------------------------
// ---------------------------------------------
export { router as Get_Requests };
