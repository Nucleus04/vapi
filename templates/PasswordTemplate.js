const template = require("./FuncTemplate");

class PasswordVerify extends template {
    constructor(async, server, messages, func) {
        super(async, server, messages, func)
    }

    verifyRequest(password) {
        //add logic
        console.log(password)
        return true
    }

    parseRequest(request) {
        const { password } = request.message.toolCalls[0].function.arguments
        if(this.verifyRequest(password)) {
            this.setResponse(200, {
                results: [
                  {
                    toolCallId: request.message.toolCalls[0].id,
                    result: "Successfully verified.",
                  },
                ],
              }, true);
        } else {
            this.setResponse(401, {
                results: [
                  {
                    toolCallId: request.message.toolCalls[0].id,
                    result: "Incorrect password.",
                  },
                ],
              });
        
        }
        return this.checkResponse()
    }
}

const messages = [
    {
        "type": "request-start",
        "content": "Verifying your password."
    },
    {
        "type": "request-failed",
        "content": "Sorry, there is something wrong on our server."
    },
    {
        "type": "request-response-delayed",
        "content": "It appears there is some delay in check our database.",
        "timingMilliseconds": 2000
    }
]
const serv = {
    url: `${process.env.URL}/verify_pass`,
}
const func = {
    "name": "verify_account_password",
    "parameters": {
        "type": "object",
        "properties": {
            "password": {
                "type": "string"
            }
        }
    },
    "description": "Retrieves account password."
}

module.exports = new PasswordVerify(false, serv, messages, func);