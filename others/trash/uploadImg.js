const { header } = require("express-validator");
const FormData = require("form-data");
const fs = require("fs");
const request = require("request");
const axios = require("axios");
// const stream = require("stream");

let formData = new FormData();

async function thisFun() {
  formData.append("files", fs.createReadStream(__dirname + "/broken.png"));
  //   formData.append("ref", "credentials");
  //   formData.append("refId", "6154359d5288e8424a94ec09");
  //   formData.append("field", "docs");

  //   let streamOne = formData.pipe(
  //     request({
  //       method: "post",
  //       headers: {
  //         authorization:
  //           "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNGI2Y2ZiMjUwNjQ1NzE1M2VjNTE0ZSIsImlhdCI6MTYzNjI4NTEyNywiZXhwIjoxNjM4ODc3MTI3fQ.YXQ9W_MGoNgIUjT6m3upeDgARYoV0CJJQjocyL17Ezk",
  //       },
  //       uri: "http://localhost:1337/upload",
  //     })
  //   );

  //   content types
  //   application/octet-stream
  //   application/x-www-form-urlencoded
  //

  axios({
    url: "http://localhost:1337/upload",
    method: "post",
    headers: {
      "Content-Type": "application/octet-stream",
      authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNGI2Y2ZiMjUwNjQ1NzE1M2VjNTE0ZSIsImlhdCI6MTYzNjI4NTEyNywiZXhwIjoxNjM4ODc3MTI3fQ.YXQ9W_MGoNgIUjT6m3upeDgARYoV0CJJQjocyL17Ezk",
    },
    data: formData,
  })
    .then((result) => {
      console.log(result.data);
    })
    .catch((err) => {
      console.log(err);
    });

  //   formData.submit(
  //     {
  //       host: "localhost",
  //       port: 1337,
  //       path: "/upload",
  // header: {
  //   authorization:
  //     "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNGI2Y2ZiMjUwNjQ1NzE1M2VjNTE0ZSIsImlhdCI6MTYzNjk5NTY1NywiZXhwIjoxNjM5NTg3NjU3fQ.BhqOnY_wHaj0dfvKLyFW8OWKWXAbO_jCM4q_1QguMw4",
  // },
  //     },
  //     (err, res) => {
  //       //   res.resume();
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         console.log(res);
  //       }
  //     }
  //   );

  async function streamToString(stream) {
    const chunks = [];
    return new Promise((resolve, reject) => {
      stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
      stream.on("error", (err) => reject(err));
      stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    });
  }

  let data = await streamToString(streamOne);
  console.log(data);
}

thisFun();

// var formData = {
//   my_file: fs.createReadStream(__dirname + "/broken.png"),
// };

// let formData = {
//   my_field: "files",
//   custom_file: {
//     value: fs.createReadStream(__dirname + "/broken.png"),
//     options: {
//       filename: "broken.png",
//       contentType: "image/jpeg",
//     },
//   },
// };

// request.post(
//   {
//     headers: {
//       authorization:
//         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNGI2Y2ZiMjUwNjQ1NzE1M2VjNTE0ZSIsImlhdCI6MTYzNjk5NTY1NywiZXhwIjoxNjM5NTg3NjU3fQ.BhqOnY_wHaj0dfvKLyFW8OWKWXAbO_jCM4q_1QguMw4",
//     },
//     url: "http://localhost:1337/upload",
//     formData: formData,
//   },
//   function (err, httpResponse, body) {
//     if (err) {
//       return console.error("upload failed:", err);
//     }
//     console.log("Upload successful!  Server responded with:", body);
//   }
// );
