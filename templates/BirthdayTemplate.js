const template = require("./FuncTemplate");

class BirthdayTemp extends template {
  constructor(async, server, messages, func) {
    super(async, server, messages, func);
  }
  parseRequest(requestBody) {
    try {
      console.log(requestBody)
      let argument = requestBody.message.toolCalls[0].function.arguments;
      console.log(argument);
      this.setResponse(200, {
        results: [
          {
            toolCallId: requestBody.message.toolCalls[0].id,
            result: "Your birthday updated successfully.",
          },
        ],
      }, true);
    } catch (error) {
      console.log(error);
      this.setResponse(400, {
        results: [
          {
            toolCallId: requestBody.message.toolCalls[0].id,
            result: "The is a problem updating your birthday.",
          },
        ],
      });
    }
    return this.checkResponse()
  }
}

const messages = [
  {
    type: "request-start",
    content: "Updating your birthday on your account.",
  },
  {
    type: "request-failed",
    content: "Sorry , there is something wrong on our server.",
  },
  {
    type: "request-response-delayed",
    content: "It appears there is some delay updating your birthday.",
    timingMilliseconds: 2000,
  },
];
const serv = {
  url: `${process.env.URL}/birthdayUpdate`,
};
const func = {
  name: "birthday_update",
  parameters: {
    type: "object",
    properties: {
      birthday: {
        type: "string",
      },
    },
  },
  description: "Updates birthday of customer.",
};
module.exports = new BirthdayTemp(true, serv, messages, func);
