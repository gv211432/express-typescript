// =================================================================================
// =================================================================================

import { axios, ENV_VAR } from "./All_Modules";
// Make a request for a user with a given ID
//  Getting token for making reading and writting the grapthql serever
// this token is valid for 30 days..
let JWT_TOKEN = "";
const getJwtToken = (): string => JWT_TOKEN;
let TOKEN_AVALILABLE = false;
const isTokenValid = (): boolean => TOKEN_AVALILABLE;
let intervalToResetJwt: ReturnType<typeof setInterval>;
let jwtEveryHour: ReturnType<typeof setInterval>;

const resetJwtToken = (): void => {
  // Clearing any previous interval on the veriable..
  try {
    clearInterval(jwtEveryHour);
  } catch (err) {}

  //   Creaing a post request to generate a new token.
  axios({
    url: `${ENV_VAR.graphql_URL}`,
    method: "post",
    data: {
      query: `mutation {
                  login(input: { identifier: "${ENV_VAR.graphql_USER}", password: "${ENV_VAR.graphql_PASS}" }) {
                   jwt
                  }
                }`,
    },
  })
    .then(function (response: any) {
      // handle success
      console.log(response.data);
      let myRes: { data: { login: { jwt: string } } } = response.data;
      JWT_TOKEN = myRes.data.login.jwt;
      TOKEN_AVALILABLE = true;
      try {
        clearInterval(intervalToResetJwt);
      } catch (err) {}
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

// Calling on the start of this script to keep jwt on the very start
// resetJwtToken();

// standard export of the apis...
export { getJwtToken, resetJwtToken, isTokenValid };
