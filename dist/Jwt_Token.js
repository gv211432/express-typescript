"use strict";
// =================================================================================
// =================================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTokenValid = exports.resetJwtToken = exports.getJwtToken = void 0;
const All_Modules_1 = require("./All_Modules");
// Make a request for a user with a given ID
//  Getting token for making reading and writting the grapthql serever
// this token is valid for 30 days..
let JWT_TOKEN = "";
const getJwtToken = () => JWT_TOKEN;
exports.getJwtToken = getJwtToken;
let TOKEN_AVALILABLE = false;
const isTokenValid = () => TOKEN_AVALILABLE;
exports.isTokenValid = isTokenValid;
let intervalToResetJwt;
let jwtEveryHour;
const resetJwtToken = () => {
    // Clearing any previous interval on the veriable..
    try {
        clearInterval(jwtEveryHour);
    }
    catch (err) { }
    //   Creaing a post request to generate a new token.
    All_Modules_1.axios({
        url: `${All_Modules_1.ENV_VAR.graphql_URL}`,
        method: "post",
        data: {
            query: `mutation {
                  login(input: { identifier: "${All_Modules_1.ENV_VAR.graphql_USER}", password: "${All_Modules_1.ENV_VAR.graphql_PASS}" }) {
                   jwt
                  }
                }`,
        },
    })
        .then(function (response) {
        // handle success
        console.log(response.data);
        let myRes = response.data;
        JWT_TOKEN = myRes.data.login.jwt;
        TOKEN_AVALILABLE = true;
        try {
            clearInterval(intervalToResetJwt);
        }
        catch (err) { }
    })
        .catch(function (error) {
        // handle error..
        // console.log("================ ERROR ================");
        // console.log(error.errors);
        TOKEN_AVALILABLE = false;
        // Try to get jwt every min if not able to recieve..
        intervalToResetJwt = setInterval(resetJwtToken, 1000 * 60);
    });
    // Calling resetJwtToken to get new token every hour..
    jwtEveryHour = setInterval(resetJwtToken, 1000 * 60 * 60);
};
exports.resetJwtToken = resetJwtToken;
//# sourceMappingURL=Jwt_Token.js.map