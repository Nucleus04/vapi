const template = require("./FuncTemplate");

const FIRSTNAME = "james";
const LASTNAME = "smith";
class UsernameTemp extends template {
  constructor(async, server, messages, func) {
    super(async, server, messages, func);
  }
  parseRequest(requestBody) {
    let argument = requestBody.message.toolCalls[0].function.arguments;
    console.log(argument);
    if (
      argument.firstname.toLowerCase() === FIRSTNAME.toLowerCase() &&
      argument.lastname.toLowerCase() === LASTNAME.toLowerCase()
    ) {
      this.setResponse(200, {
        results: [
          {
            toolCallId: requestBody.message.toolCalls[0].id,
            result: "Your name exist in our database.",
          },
        ],
      });
    } else {
      this.setResponse(400, {
        results: [
          {
            toolCallId: requestBody.message.toolCalls[0].id,
            result: "I'm sorry, i didn't find your name on our database.",
          },
        ],
      });
    }
  }
}

const messages = [
  {
    type: "request-start",
    content: "Checking the database for existing accounts.",
  },
  {
    type: "request-failed",
    content: "Sorry , there is something wrong on our server.",
  },
  {
    type: "request-response-delayed",
    content: "It appears there is some delay in check our database.",
    timingMilliseconds: 2000,
  },
];
const serv = {
  url: "https://kind-intensely-herring.ngrok-free.app/verify_name",
};
const func = {
  name: "verify_user",
  parameters: {
    type: "object",
    properties: {
      firstname: {
        type: "string",
      },
      lastname: {
        type: "string",
      },
    },
  },
  description: "Retrieves the user from database.",
};
module.exports = new UsernameTemp(true, serv, messages, func);
