import {
  router,
  axios,
  bcrypt,
  ENV_VAR,
  check,
  validationResult,
  express,
  request,
} from "../All_Modules";
import { getJwtToken } from "../Jwt_Token";

import { checkAuthUser } from "../Passport_Config";

import { Stream } from "stream";

router.use("/upload", async (req, res) => {
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
  let source = req.pipe(
    request({
      qs: req.query,
      uri: `${ENV_VAR.strapi_HOST}:${ENV_VAR.strapi_PORT}/upload`,
    })
  );

  // creating two streams, one to send in response and one to interpret here!!
  let stream1 = source.pipe(new Stream.PassThrough());
  let stream2 = source.pipe(new Stream.PassThrough());

  // sending the response to the client..
  stream1.pipe(res);

  // this function catches stream data and convert into a variable string..
  function streamToString(stream: any) {
    const chunks: any[] = [];
    return new Promise((resolve, reject) => {
      stream.on("data", (chunk: any) => chunks.push(Buffer.from(chunk)));
      stream.on("error", (err: any) => reject(err));
      stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    });
  }

  // converting one streams data into variable string..
  // result it the stream data in string format
  const result = await streamToString(stream2);

  // setTimeout(() => console.log(response), 3000);

  console.log("Printing response");
  console.log(result);
});

export const uploadFileHandler = router;
