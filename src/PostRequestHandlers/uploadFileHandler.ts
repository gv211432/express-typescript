import { router, ENV_VAR, request } from "../All_Modules";
import { getJwtToken } from "../Jwt_Token";

import { checkAuthUser } from "../Passport_Config";

import { Stream } from "stream";

import { getUserData } from "../GLOBAL_DATA";

// var FormData = require("form-data");

router.use("/upload", checkAuthUser, async (req, res) => {
  // TODO last working on the upload and maximum stack exceed
  // console.log("==========================================================");
  // console.log(req.body);

  if (req.method === "POST") {
    async function uploadForm() {
      let source = req.pipe(
        request({
          headers: {
            Authorization: `Bearer ${getJwtToken()}`,
          },
          qs: req.query,
          uri: `${ENV_VAR.strapi_HOST}:${ENV_VAR.strapi_PORT}/upload`,
        })
      );
      // creating two streams, one to send in response and one to interpret here!!
      // let stream1 = source.pipe(new Stream.PassThrough());
      let stream2 = source.pipe(new Stream.PassThrough());

      // sending the response to the client..
      // stream1.pipe(res);
      // res.json({ success: true });

      // this function catches stream data and convert into a variable string..
      function streamToString(stream: any) {
        const chunks: any[] = [];
        return new Promise((resolve, reject) => {
          stream.on("data", (chunk: any) => chunks.push(Buffer.from(chunk)));
          stream.on("error", (err: any) => reject(err));
          stream.on("end", () =>
            resolve(Buffer.concat(chunks).toString("utf8"))
          );
        });
      }

      // converting one streams data into variable string..
      // result it the stream data in string format
      const result = (await streamToString(stream2)) as string;
      let resultObj = await JSON.parse(result);
      // console.log(resultObj[0]);
      if (resultObj[0].id) {
        res.json({ success: true });
      } else {
        res.json({ success: false });
      }
    }
    uploadForm();
  }
});

export const uploadFileHandler = router;
