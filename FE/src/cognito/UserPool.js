import { CognitoUserPool } from "amazon-cognito-identity-js";
// import { DotenvConfigOutput } from "dotenv";

const poolData = {
    // UserPoolId: process.env.USER_POOL_ID,
    // ClientId: process.env.CLIENT_ID
    UserPoolId: "eu-north-1_6svbKU0wg",
    ClientId: "1rklv1kojb6ctu9h2ue7o0npie"
}

export default new CognitoUserPool(poolData);