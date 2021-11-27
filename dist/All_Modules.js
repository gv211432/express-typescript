"use strict";
// ┏━┓╻  ╻     ┏┳┓┏━┓╺┳┓╻ ╻╻  ┏━╸┏━┓
// ┣━┫┃  ┃     ┃┃┃┃ ┃ ┃┃┃ ┃┃  ┣╸ ┗━┓
// ╹ ╹┗━╸┗━╸   ╹ ╹┗━┛╺┻┛┗━┛┗━╸┗━╸┗━┛
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.http = exports.formidable = exports.getRandomString = exports.getRandomInt = exports.flash = exports.LocalStrategy = exports.passport = exports.ENV_VAR = exports.bcrypt = exports.request = exports.axios = exports.cors = exports.router = exports.express = exports.validationResult = exports.body = exports.check = exports.sessions = exports.path = exports.uuidv4 = exports.app = exports.dotenv = void 0;
// This file contains all the modules to be used in this project.
// Any module must be imported first here, then exported for use
// This script will export all modules for other scripts to use directly.
// Just use standard require() function to import them and destruct them...
// ================== MY ALL MODULES ====================================
// =======================================================================
// This handles all the global variables that can be assigned form .env file
const dotenv_1 = __importDefault(require("dotenv"));
exports.dotenv = dotenv_1.default;
dotenv_1.default.config();
// This is the fastest way to start a http server
const express_1 = __importDefault(require("express"));
exports.express = express_1.default;
const app = express_1.default();
exports.app = app;
// this is used to pipe the request form the nodejs api to other api
const http_1 = __importDefault(require("http"));
exports.http = http_1.default;
// this library is use to handel files uploads
const formidable_1 = __importDefault(require("formidable"));
exports.formidable = formidable_1.default;
// This create route path, can be accessed directly on the browser..
const router = express_1.default.Router();
exports.router = router;
// this is used to show the information directly on the web page..
const express_flash_1 = __importDefault(require("express-flash"));
exports.flash = express_flash_1.default;
// // Body parser for handling body on post requests..
// const bodyParser = require("body-parser");
// This is use to save date about the perticual on the server itself
const express_session_1 = __importDefault(require("express-session"));
exports.sessions = express_session_1.default;
// This is useful for cross origin resources sharing
const cors_1 = __importDefault(require("cors"));
exports.cors = cors_1.default;
// This is useful to join two strings to generate path
const path_1 = __importDefault(require("path"));
exports.path = path_1.default;
// This is a best module for unique token generators
const uuid_1 = require("uuid");
const uuidv4 = uuid_1.v4;
exports.uuidv4 = uuidv4;
// This is useful for validating and checking the data given in request body
// before submitting to database..
const express_validator_1 = require("express-validator");
Object.defineProperty(exports, "check", { enumerable: true, get: function () { return express_validator_1.check; } });
Object.defineProperty(exports, "body", { enumerable: true, get: function () { return express_validator_1.body; } });
Object.defineProperty(exports, "validationResult", { enumerable: true, get: function () { return express_validator_1.validationResult; } });
// To generate salt and hashs of the password..
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.bcrypt = bcrypt_1.default;
// this package is used to send get or post request in the server
const axios_1 = __importDefault(require("axios"));
exports.axios = axios_1.default;
const request_1 = __importDefault(require("request"));
exports.request = request_1.default;
/*  PASSPORT SETUP  */
// importing the passport plugin
const passport_1 = __importDefault(require("passport"));
exports.passport = passport_1.default;
// for creating new local stratergy for user validation
const LocalStrategy = require("passport-local").Strategy;
exports.LocalStrategy = LocalStrategy;
// ===================== Setting Environment Variables ==================
// =======================================================================
// Importing the env variables from the .env file in the same directory...
// Creatin an object to export the variables for easy use..
const ENV_VAR = {
    serverPort: process.env.SERVER_PORT,
    serverHost: process.env.SERVER_HOST,
    secretSession: process.env.SECRET_SESSION,
    frontend_DIR: process.env.FRONT_DIR,
    mqtt_HOST: process.env.MQTT_HOST,
    graphql_URL: process.env.GRAPHQL_URL,
    graphql_USER: process.env.GRAPHQL_USER,
    graphql_PASS: process.env.GRAPHQL_PASS,
    strapi_PORT: process.env.STRAPI_PORT,
    strapi_HOST: process.env.STRAPI_HOST,
    development_STATUS: process.env.DEVELOPMENT,
};
exports.ENV_VAR = ENV_VAR;
// ======================== Home made functions ==========================
// =======================================================================
// function for generating random tokens
function getRandomString(length) {
    var randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var result = "";
    for (var i = 0; i < length; i++) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
}
exports.getRandomString = getRandomString;
// function for generating random numbers of given length..
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
exports.getRandomInt = getRandomInt;
//# sourceMappingURL=All_Modules.js.map