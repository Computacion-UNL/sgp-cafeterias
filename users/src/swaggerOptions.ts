export const options = {
  definition: {
    //Open API is a standard for API documentation.
    openapi: "3.0.0",
    info: {
      title: "Users API",
      version: "1.0.0",
      description: "User management API",
    },
    servers: [
      {
        url: "https://cafeterias.dev/api/users",
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./src/schemas/*.ts"],
};
