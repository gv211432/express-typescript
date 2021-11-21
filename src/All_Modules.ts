// ┏━┓╻  ╻     ┏┳┓┏━┓╺┳┓╻ ╻╻  ┏━╸┏━┓
// ┣━┫┃  ┃     ┃┃┃┃ ┃ ┃┃┃ ┃┃  ┣╸ ┗━┓
// ╹ ╹┗━╸┗━╸   ╹ ╹┗━┛╺┻┛┗━┛┗━╸┗━╸┗━┛

// This file contains all the modules to be used in this project.
// Any module must be imported first here, then exported for use
// This script will export all modules for other scripts to use directly.
// Just use standard require() function to import them and destruct them...

// ================== MY ALL MODULES ====================================
// =======================================================================

// This handles all the global variables that can be assigned form .env file
import dotenv from "dotenv";
dotenv.config();

// This is the fastest way to start a http server
import express from "express";
const app = express();

// this is used to pipe the request form the nodejs api to other api
import http from "http";

// this library is use to handel files uploads
import formidable from "formidable";

// This create route path, can be accessed directly on the browser..
const router = express.Router();

// this is used to show the information directly on the web page..
import flash from "express-flash";

// // Body parser for handling body on post requests..
// const bodyParser = require("body-parser");

// This is use to save date about the perticual on the server itself
import sessions from "express-session";

// This is useful for cross origin resources sharing
import cors from "cors";

// This is useful to join two strings to generate path
import path from "path";

// This is a best module for unique token generators
import { v4 } from "uuid";
const uuidv4 = v4;

// This is useful for validating and checking the data given in request body
// before submitting to database..
import { check, body, validationResult } from "express-validator";

// To generate salt and hashs of the password..
import bcrypt from "bcrypt";

// this package is used to send get or post request in the server
import axios from "axios";

import request from "request";

/*  PASSPORT SETUP  */
// importing the passport plugin
import passport from "passport";

// for creating new local stratergy for user validation
const LocalStrategy = require("passport-local").Strategy;

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

// ======================== Home made functions ==========================
// =======================================================================

// function for generating random tokens
function getRandomString(length: number) {
  var randomChars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var result = "";
  for (var i = 0; i < length; i++) {
    result += randomChars.charAt(
      Math.floor(Math.random() * randomChars.length)
    );
  }
  return result;
}

// function for generating random numbers of given length..
function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

// =====================Setting express sessions========================
// =======================================================================

// =======================================================================
// =======================================================================

// ┏┳┓┏━┓╺┳┓╻ ╻╻  ┏━╸   ┏━╸╻ ╻┏━┓┏━┓┏━┓╺┳╸┏━┓
// ┃┃┃┃ ┃ ┃┃┃ ┃┃  ┣╸    ┣╸ ┏╋┛┣━┛┃ ┃┣┳┛ ┃ ┗━┓
// ╹ ╹┗━┛╺┻┛┗━┛┗━╸┗━╸   ┗━╸╹ ╹╹  ┗━┛╹┗╸ ╹ ┗━┛

// To include any moduel just use allModules to include
export {
  dotenv,
  app,
  uuidv4,
  path,
  sessions,
  check,
  body,
  validationResult,
  express,
  router,
  cors,
  axios,
  request,
  bcrypt,
  ENV_VAR,
  passport,
  LocalStrategy,
  flash,
  getRandomInt,
  getRandomString,
  formidable,
  http,
};
