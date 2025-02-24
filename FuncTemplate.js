class FuncTemplate {
  #async = true;
  #type = "function";
  #func = {
    name: "",
    description: "",
    parameters: {
      type: "object",
      properties: {},
    },
  };
  #server = {
    timeoutSeconds: 10,
    url: "",
    secret: "",
  };
  #messages = [];
  #response = {
    statusCode: 200,
    message: {
      results: [
        {
          toolCallId: "",
          result: "",
        },
      ],
    },
  };
  constructor(async, server, messages = [], func = {}) {
    this.#async = async;
    this.#func = func;
    this.#server = server;
    this.#messages = messages;
  }
  get Response() {
    return this.#response;
  }

  setResponse(err, message) {
    this.#response.message = message;
    this.#response.statusCode = err;
    return;
  }
  verify() {
    if (!this.#func.name || typeof this.#func.name !== "string")
      throw new Error("Missing function name!");
    if (!this.#func.description || typeof this.#func.description !== "string")
      throw new Error("Missing function description!");
    if (!this.#func.parameters || typeof this.#func.parameters !== "object")
      throw new Error("Missing function parameters!");
    if (
      !this.#func.parameters.properties ||
      typeof this.#func.parameters.properties !== "object"
    )
      throw new Error("Missing function parameters properties!");
    if (!this.#server.url || !this.#server.url.includes("https"))
      throw new Error("Invalid server url!");
    if (!this.#messages.length) throw new Error("Missing messages!");
  }
  toObject() {
    return {
      async: this.#async,
      type: this.#type,
      server: this.#server,
      function: this.#func,
      messages: this.#messages,
    };
  }
  checkResponse() {
    if (!this.#response.message.results.length)
      throw new Error("Missing results!");
    for (const result of this.#response.message.results) {
      if (!result.toolCallId || typeof result.toolCallId !== "string")
        throw new Error("Missing toolCallId!");
      if (!result.result || typeof result.result !== "string")
        throw new Error("Missing result!");
    }
  }
  parseRequest(request) {
    throw new Error("Method not implemented.");
    //assign responst
    this.checkResponse();
  }
}

module.exports = FuncTemplate;
