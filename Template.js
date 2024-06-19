const query =
  "You are a voice assistant for checking username and updating their data on companies database. You need to ask them some of their personal data to update and verify.  First ask them if their name exist on database. If yes, then go ahead and ask their zip code to update it. After that ask their birthday so you can update it also.";

const template = require("./FuncTemplate");

class ZipCodeTemp extends template {
  constructor(async, server, messages, func) {
    super(async, server, messages, func);
  }
  parseRequest(requestBody) {
    let argument = requestBody.message.toolCalls[0].function.arguments;
    console.log("Arguments", argument);

    try {
      const zip = parseInt(argument.zipcode);
      console.log(zip);
      if (isNaN(zip)) {
        this.setResponse(400, {
          results: [
            {
              toolCallId: requestBody.message.toolCalls[0].id,
              result: "Your zip code is not valid.",
            },
          ],
        });
      } else {
        this.setResponse(200, {
          results: [
            {
              toolCallId: requestBody.message.toolCalls[0].id,
              result: "Your zip code updated successfully.",
            },
          ],
        });
      }
    } catch (error) {
      this.setResponse(400, {
        results: [
          {
            toolCallId: requestBody.message.toolCalls[0].id,
            result: "There was an error while updating your zipcode.",
          },
        ],
      });
    }
  }
}

const messages = [
  {
    type: "request-start",
    content: "Checking your zip code...",
  },
  {
    type: "request-failed",
    content: "Sorry , there is something wrong on our server.",
  },
  {
    type: "request-response-delayed",
    content:
      "It appears there is some delay veiriying and updating your zip code.",
    timingMilliseconds: 2000,
  },
];
const serv = {
  url: "https://kind-intensely-herring.ngrok-free.app/birthdayUpdate",
};
const func = {
  name: "zipcode_update",
  parameters: {
    type: "object",
    properties: {
      zipcode: {
        type: "string",
      },
    },
  },
  description: "Verify and update zipcode.",
};
module.exports = new ZipCodeTemp(false, serv, messages, func);

class BirthdayTemp extends template {
  constructor(async, server, messages, func) {
    super(async, server, messages, func);
  }
  parseRequest(requestBody) {
    try {
      let argument = requestBody.message.toolCalls[0].function.arguments;
      console.log(argument);
      this.setResponse(200, {
        results: [
          {
            toolCallId: requestBody.message.toolCalls[0].id,
            result: "Your birthday updated successfully.",
          },
        ],
      });
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
  url: "https://kind-intensely-herring.ngrok-free.app/birthdayUpdate",
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
