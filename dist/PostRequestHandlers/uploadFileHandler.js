"use strict";
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
exports.uploadFileHandler = void 0;
const All_Modules_1 = require("../All_Modules");
const Jwt_Token_1 = require("../Jwt_Token");
const Passport_Config_1 = require("../Passport_Config");
const stream_1 = require("stream");
// var FormData = require("form-data");
All_Modules_1.router.use("/upload", Passport_Config_1.checkAuthUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // TODO last working on the upload and maximum stack exceed
    // console.log("==========================================================");
    // console.log(req.body);
    if (req.method === "POST") {
        function uploadForm() {
            return __awaiter(this, void 0, void 0, function* () {
                let source = req.pipe(All_Modules_1.request({
                    headers: {
                        Authorization: `Bearer ${Jwt_Token_1.getJwtToken()}`,
                    },
                    qs: req.query,
                    uri: `${All_Modules_1.ENV_VAR.strapi_HOST}:${All_Modules_1.ENV_VAR.strapi_PORT}/upload`,
                }));
                // creating two streams, one to send in response and one to interpret here!!
                // let stream1 = source.pipe(new Stream.PassThrough());
                let stream2 = source.pipe(new stream_1.Stream.PassThrough());
                // sending the response to the client..
                // stream1.pipe(res);
                // res.json({ success: true });
                // this function catches stream data and convert into a variable string..
                function streamToString(stream) {
                    const chunks = [];
                    return new Promise((resolve, reject) => {
                        stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
                        stream.on("error", (err) => reject(err));
                        stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
                    });
                }
                // converting one streams data into variable string..
                // result it the stream data in string format
                const result = (yield streamToString(stream2));
                let resultObj = yield JSON.parse(result);
                // console.log(resultObj[0]);
                if (resultObj[0].id) {
                    res.json({ success: true });
                }
                else {
                    res.json({ success: false });
                }
            });
        }
        uploadForm();
    }
}));
exports.uploadFileHandler = All_Modules_1.router;
//# sourceMappingURL=uploadFileHandler.js.map