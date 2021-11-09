// ╻ ╻╻┏━┓╻ ╻╻ ╻┏━┓╻┏ ┏━┓┏━┓┏┳┓┏━┓   ╻ ╻┏━┓┏┳┓┏━╸  ┏━┓╻ ╻╺┳╸┏━┓┏┳┓┏━┓╺┳╸╻┏━┓┏┓╻┏━┓
// ┃┏┛┃┗━┓┣━┫┃╻┃┣━┫┣┻┓┣━┫┣┳┛┃┃┃┣━┫   ┣━┫┃ ┃┃┃┃┣╸   ┣━┫┃ ┃ ┃ ┃ ┃┃┃┃┣━┫ ┃ ┃┃ ┃┃┗┫┗━┓
// ┗┛ ╹┗━┛╹ ╹┗┻┛╹ ╹╹ ╹╹ ╹╹┗╸╹ ╹╹ ╹   ╹ ╹┗━┛╹ ╹┗━╸  ╹ ╹┗━┛ ╹ ┗━┛╹ ╹╹ ╹ ╹ ╹┗━┛╹ ╹┗━┛
// this is the main script of the project, which is executed first on load of this project..

// =================================================================================
// =================================================================================

// Imporitng some varaibles form the standard script exports(./All_modules)
import {
  express,
  app,
  axios,
  bcrypt,
  ENV_VAR,
  check,
  validationResult,
  passport,
  flash,
  path,
  cors,
} from "./All_Modules";

import { Get_Requests } from "./GET_REQUEST";
import { Post_Requests } from "./POST_REQUESTS";
import { getJwtToken, resetJwtToken, isTokenValid } from "./Jwt_Token";
resetJwtToken();

// app.use(express.static(__dirname + "/" + front_DIR));
// app.use(express.static(__dirname + "/frontend"));
// console.log(__dirname);

app.use(cors());
app.use(express.static(path.join(__dirname, "..", ENV_VAR.frontend_DIR)));
// app.use(express.static(path.join(__dirname, "Raw_Sources/NiceAdmin")));

// Tamplets engine settings (EJS)
app.set("view engine", "ejs");
app.set("views", "./views");

// initailizing the express flash
app.use(flash());

// =================================================================================
// =================================================================================

// importing session
const expressSession = require("express-session")({
  secret: ENV_VAR.secretSession,
  resave: false,
  saveUninitialized: false,
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
});

// bodyparser and session middleware setup
// this used to read the body of the get/post request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressSession);

/*  PASSPORT SETUP  */
import { passportConfig } from "./Passport_Config";
passportConfig(passport);
// passport middlewar setup
app.use(passport.initialize());
app.use(passport.session());

// ============================================================================
// Using the middlewares
// following code implements all the routes created in the GER_REQUEST and POST_REQUEST
app.use(Get_Requests);
app.use(Post_Requests);

// Starting the server on given port
app.listen(ENV_VAR.serverPort, () => {
  console.log(
    "server started on port: " +
      ENV_VAR.serverPort +
      " ==>   http://" +
      ENV_VAR.serverHost +
      ":" +
      ENV_VAR.serverPort +
      "\n\n"
  );
});
