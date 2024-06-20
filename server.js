require('dotenv').config()
const express = require("express");
const fs = require("fs");
const app = express();
const port = process.env.PORT;
app.use(express.json());

const usertemp = require("./templates/UserTemplate");
const birthdaytemp = require("./templates/BirthdayTemplate");
const zipcodetemp = require("./templates/ZipCodeTemp");
const cardNumTemp = require("./templates/CardNumTemplate");
const passwordTemp = require("./templates/PasswordTemplate");
const isPassReqTemp = require("./templates/PasswordReqTemplate");


usertemp.verify();
birthdaytemp.verify();

app.post("/verify_name", (req, res) => {
  const requestBody = req.body;
  const jsonContent = JSON.stringify(requestBody, null, 2);
  usertemp.parseRequest(requestBody);

  const response = usertemp.Response.message
  const statusCode = usertemp.Response.statusCode
  res.status(statusCode).json(response);

  // fs.writeFile("request-body.json", jsonContent, (err) => {
  //   if (err) {
  //     console.error("Error saving JSON file:", err);
  //     return;
  //   }
  //   // res.statusCode = customres.statusCode;
  //   res.send(customres.message);
  // });
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

  const response = birthdaytemp.Response.message
  const statusCode = birthdaytemp.Response.statusCode
  res.status(statusCode).json(response);
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

  const response = zipcodetemp.Response.message
  const statusCode = zipcodetemp.Response.statusCode
  res.status(statusCode).json(response);
});

app.post("/card_num", (req, res) => {
  cardNumTemp.parseRequest(req.body)

  const response = cardNumTemp.Response.message
  const statusCode = cardNumTemp.Response.statusCode
  res.status(statusCode).json(response);
})

app.post("/verify_pass", (req, res) => {
  passwordTemp.parseRequest(req.body)

  const response = passwordTemp.Response.message
  const statusCode = passwordTemp.Response.statusCode
  res.status(statusCode).json(response);
})

app.post("/pass_required", (req, res) => {
  isPassReqTemp.parseRequest(req.body)
  
  const response = isPassReqTemp.Response.message
  const statusCode = isPassReqTemp.Response.statusCode
  res.status(statusCode).json(response);
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
