const express = require("express");
const fs = require("fs");
const app = express();
const port = 8080;
app.use(express.json());

const usertemp = require("./UserTemplate");
const birthdaytemp = require("./BirthdayTemplate");
const zipcodetemp = require("./ZipCodeTemp");

usertemp.verify();
birthdaytemp.verify();

app.post("/verify_name", (req, res) => {
  const requestBody = req.body;
  const jsonContent = JSON.stringify(requestBody, null, 2);
  usertemp.parseRequest(requestBody);
  usertemp.checkResponse();
  const customres = usertemp.Response;

  fs.writeFile("request-body.json", jsonContent, (err) => {
    if (err) {
      console.error("Error saving JSON file:", err);
      return;
    }
    // res.statusCode = customres.statusCode;
    res.send(customres.message);
  });
});

app.post("/birthdayUpdate", (req, res) => {
  const jsonContent = JSON.stringify(req.body, null, 2);
  fs.writeFile("request-body.json", jsonContent, (err) => {
    if (err) {
      console.error("Error saving JSON file:", err);
      return;
    }
  });
  birthdaytemp.parseRequest(req.body);
  birthdaytemp.checkResponse();
  const customres = usertemp.Response;
  // res.statusCode = customres.statusCode;
  res.send(customres.message);
});

app.post("/zipCodeUpdate", (req, res) => {
  const jsonContent = JSON.stringify(req.body, null, 2);
  fs.writeFile("request-body.json", jsonContent, (err) => {
    if (err) {
      console.error("Error saving JSON file:", err);
      return;
    }
  });
  zipcodetemp.parseRequest(req.body);
  zipcodetemp.checkResponse();
  const customres = zipcodetemp.Response;
  // res.statusCode = customres.statusCode;
  res.send(customres.message);
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
