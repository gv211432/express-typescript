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
const stream_1 = require("stream");
All_Modules_1.router.use("/upload", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // try {
    //   // console.log(req.headers);
    //   var form = new formidable.IncomingForm();
    //   form.parse(req, function (err, fields, files) {
    //     console.log(fields);
    //     console.log(files);
    //     res.status(200).send("File uploaded");
    //   });
    // } catch (error) {}
    // const mapReq = http.request(`http://localhost:1337/upload`, (mapRes) =>
    //   mapRes.pipe(res)
    // );
    // mapReq.end();
    //Take the baseurl from your api and also supply whatever
    //route you use with that url
    //Pipe is through request, this will just redirect
    //everything from the api to your own server at localhost.
    //It will also pipe your queries in the url
    let source = req.pipe((0, All_Modules_1.request)({
        qs: req.query,
        uri: `${All_Modules_1.ENV_VAR.strapi_HOST}:${All_Modules_1.ENV_VAR.strapi_PORT}/upload`,
    }));
    // creating two streams, one to send in response and one to interpret here!!
    let stream1 = source.pipe(new stream_1.Stream.PassThrough());
    let stream2 = source.pipe(new stream_1.Stream.PassThrough());
    // sending the response to the client..
    stream1.pipe(res);
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
    const result = yield streamToString(stream2);
    // setTimeout(() => console.log(response), 3000);
    console.log("Printing response");
    console.log(result);
}));
exports.uploadFileHandler = All_Modules_1.router;
//# sourceMappingURL=uploadFileHandler.js.map