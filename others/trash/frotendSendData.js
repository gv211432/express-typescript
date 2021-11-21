app.post("/varification", (req, res) => {
  axios.post("URL", verify).then((response) => {
    console.log(response.data);
    // if your response.data is "user found"
    res.json({ varificationStatus: response.data });
  });
});
