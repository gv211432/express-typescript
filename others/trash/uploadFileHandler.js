console.log(req.params);
console.log(req.query);
console.log(req.body);

// let preservReq1 = req.pipe(new Stream.PassThrough());
// let preservReq2 = req.pipe(new Stream.PassThrough());
// let preserveReq3 = new Stream.Readable();

try {
  // console.log(req.headers);
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    console.log(fields);
    console.log(files);
    res.status(200).send("File uploaded");
  });
} catch (error) {}

const mapReq = http.request(`http://localhost:1337/upload`, (mapRes) =>
  mapRes.pipe(res)
);
mapReq.end();

// Take the baseurl from your api and also supply whatever
// route you use with that url
// Pipe is through request, this will just redirect
// everything from the api to your own server at localhost.
// It will also pipe your queries in the url
// let newQuery = { ...req.query, ref: "" };

if (req.method === "POST") {
  // console.log("executing cmd");
  // req.on("data", (chunk) => {
  //   console.log(chunk);
  // });
  // req.on("end", () => {
  //   console.log("================ Done =====================");
  // });
  // function streamToString(stream: any) {
  //   const chunks: any[] = [];
  //   return new Promise((resolve, reject) => {
  //     stream.on("data", (chunk: any) => {
  //       chunks.push(Buffer.from(chunk));
  //       preserveReq3._read(chunk.length);
  //       preserveReq3.push(chunk);
  //     });
  //     stream.on("error", (err: any) => reject(err));
  //     stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
  //   });
  // }
  // let mydata = await streamToString(req);
  // console.log(mydata);
}

// this will hold the id of the authenticated user on this route
// let currentId = "";
// async function dataLoaded() {
//   currentId = getUserData().id;
// }

// dataLoaded().then(() => {});
// this will get the fields and the data of the IncomingForm on this route
// const form = new formidable.IncomingForm();
// form.parse(preserveReq3, async function (err, fields, files) {
//   console.log(files);
//   // let newForm = new FormData();
//   // dataLoaded().then(() => {
//   //   newForm.append("ref", "credentials");
//   //   newForm.append("refId", currentId);
//   //   newForm.append("field", "docs");
//   //   newForm.append(files)
//   // });
//   // newForm.pipe(
//   //   request({
//   //     headers: {
//   //       Authorization: `Bearer ${getJwtToken()}`,
//   //     },
//   //     qs: req.query,
//   //     uri: `${ENV_VAR.strapi_HOST}:${ENV_VAR.strapi_PORT}/upload`,
//   //   })
//   // );
// });
// form.on(
//   "data",
//   ({ name, key, value, buffer, start, end, formname, ...more }) => {
//     if (name === "partBegin") {
//     }
//     if (name === "partData") {
//     }
//     if (name === "headerField") {
//     }
//     if (name === "headerValue") {
//     }
//     if (name === "headerEnd") {
//     }
//     if (name === "headersEnd") {
//     }
//     if (name === "field") {
//       console.log("field name:", key);
//       console.log("field value:", value);
//     }
//     if (name === "file") {
//       console.log("file:", formname, value);
//     }
//     if (name === "fileBegin") {
//       console.log("fileBegin:", formname, value);
//     }
//   }
// );

// form.onPart = (part) => {
//   console.log("Part executed");
//   if (part.name == "files") {
//     console.log("Part executed internal");
//     part.on("data", (buffer) => {
//       newForm.append("some", buffer);
//     });
//     part.on("end", () => {
//       newForm.pipe(
//         request({
//           headers: {
//             Authorization: `Bearer ${getJwtToken()}`,
//           },
//           qs: req.query,
//           uri: `${ENV_VAR.strapi_HOST}:${ENV_VAR.strapi_PORT}/upload`,
//         })
//       );
//     });
//   }
// };
