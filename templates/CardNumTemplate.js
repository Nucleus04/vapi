const template = require("./FuncTemplate");

class CardNum extends template {
    constructor(async, server, messages, func) {
        super(async, server, messages, func)
    }

    verifyRequest(number) {
        //insert verification logic
        console.log(number)
        if(number === "1234") {
            return { verified: true, passRequired: true }

        } else if (number === "0000") {
            return { verified: true, passRequired: false }
        }
        return { verified: false, passRequired: false }
    }

    parseRequest(request) {
        const { number } = request.message.toolCalls[0].function.arguments
        const { verified, passRequired } = this.verifyRequest(number)
        console.log("verified: ", verified, " password: ", passRequired)
        if(passRequired) {
            this.setResponse(200, {
                results: [
                  {
                    toolCallId: request.message.toolCalls[0].id,
                    result: "Card verified but ask for account's password.",
                  },
                ],
              }, true);
        } else if(verified) {
            this.setResponse(200, {
                results: [
                  {
                    toolCallId: request.message.toolCalls[0].id,
                    result: "Card number is verified and password is not required",
                  },
                ],
              }, true);
        } else {
            this.setResponse(401, {
                results: [
                  {
                    toolCallId: request.message.toolCalls[0].id,
                    result: "Card number unidentified.",
                  },
                ],
              }, true);
        
        }
        return this.checkResponse()
    }
}

const messages = [
    {
        "type": "request-start",
        "content": "Verifying number."
    },
    {
        "type": "request-failed",
        "content": "Sorry, there seems to have been an error."
    },
    {
        "type": "request-response-delayed",
        "content": "It appears there is some delay in check our database.",
        "timingMilliseconds": 2000
    }
]
const serv = {
    url: `${process.env.URL}/card_num`,
}
const func = {
    name: "retrieve_card_number",
    parameters: {
        type: "object",
        properties: {
            number: {
                type: "string",
            }
        },
    },
    description: "Retrieves card number.",
}

module.exports = new CardNum(false, serv, messages, func);
