"use strict";
// ╻ ╻╻┏━┓╻ ╻╻ ╻┏━┓╻┏ ┏━┓┏━┓┏┳┓┏━┓   ╻ ╻┏━┓┏┳┓┏━╸  ┏━┓╻ ╻╺┳╸┏━┓┏┳┓┏━┓╺┳╸╻┏━┓┏┓╻┏━┓
// ┃┏┛┃┗━┓┣━┫┃╻┃┣━┫┣┻┓┣━┫┣┳┛┃┃┃┣━┫   ┣━┫┃ ┃┃┃┃┣╸   ┣━┫┃ ┃ ┃ ┃ ┃┃┃┃┣━┫ ┃ ┃┃ ┃┃┗┫┗━┓
// ┗┛ ╹┗━┛╹ ╹┗┻┛╹ ╹╹ ╹╹ ╹╹┗╸╹ ╹╹ ╹   ╹ ╹┗━┛╹ ╹┗━╸  ╹ ╹┗━┛ ╹ ┗━┛╹ ╹╹ ╹ ╹ ╹┗━┛╹ ╹┗━┛
// this is the main script of the project, which is executed first on load of this project..
Object.defineProperty(exports, "__esModule", { value: true });
// =================================================================================
// =================================================================================
// Imporitng some varaibles form the standard script exports(./All_modules)
const All_Modules_1 = require("./All_Modules");
const GET_REQUEST_1 = require("./GET_REQUEST");
const POST_REQUESTS_1 = require("./POST_REQUESTS");
const Jwt_Token_1 = require("./Jwt_Token");
// to open firefox for debugging..
const child_process_1 = require("child_process");
(0, Jwt_Token_1.resetJwtToken)();
// app.use(express.static(__dirname + "/" + front_DIR));
// app.use(express.static(__dirname + "/frontend"));
// console.log(__dirname);
All_Modules_1.app.use((0, All_Modules_1.cors)());
All_Modules_1.app.use(All_Modules_1.express.static(All_Modules_1.path.join(__dirname, "..", All_Modules_1.ENV_VAR.frontend_DIR)));
// app.use(express.static(path.join(__dirname, "Raw_Sources/NiceAdmin")));
// Tamplets engine settings (EJS)
All_Modules_1.app.set("view engine", "ejs");
All_Modules_1.app.set("views", "./views");
// initailizing the express flash
All_Modules_1.app.use((0, All_Modules_1.flash)());
// =================================================================================
// =================================================================================
// importing session
const expressSession = require("express-session")({
    secret: All_Modules_1.ENV_VAR.secretSession,
    resave: false,
    saveUninitialized: false,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
});
// bodyparser and session middleware setup
// this used to read the body of the get/post request
All_Modules_1.app.use(All_Modules_1.express.json());
All_Modules_1.app.use(All_Modules_1.express.urlencoded({ extended: true }));
All_Modules_1.app.use(expressSession);
/*  PASSPORT SETUP  */
const Passport_Config_1 = require("./Passport_Config");
(0, Passport_Config_1.passportConfig)(All_Modules_1.passport);
// passport middlewar setup
All_Modules_1.app.use(All_Modules_1.passport.initialize());
All_Modules_1.app.use(All_Modules_1.passport.session());
// ============================================================================
// Using the middlewares
// following code implements all the routes created in the GER_REQUEST and POST_REQUEST
All_Modules_1.app.use(GET_REQUEST_1.Get_Requests);
All_Modules_1.app.use(POST_REQUESTS_1.Post_Requests);
// Starting the server on given port
All_Modules_1.app.listen(All_Modules_1.ENV_VAR.serverPort, () => {
    console.log("server started on port: " +
        All_Modules_1.ENV_VAR.serverPort +
        " ==>   http://" +
        All_Modules_1.ENV_VAR.serverHost +
        ":" +
        All_Modules_1.ENV_VAR.serverPort +
        "\n\n");
});
if (All_Modules_1.ENV_VAR.development_STATUS) {
    (0, child_process_1.exec)(`firefox http://${All_Modules_1.ENV_VAR.serverHost}:${All_Modules_1.ENV_VAR.serverPort}`, () => {
        console.log(`Opening In browser`);
    });
}
//# sourceMappingURL=index.js.map