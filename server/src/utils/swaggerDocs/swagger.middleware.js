import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// ------------------------------------------------------

const url = `${process.env.DOMAIN}${process.env.PORT}`;

// ------------------------------------------------------

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    components: {},
    info: {
      version: "1.0.0",
      title: "Pickle API",
      description: "Pickle API Information and description",
      contact: {
        name: "just Mario",
        email: "mario3monirs@gmail.com",
      },
      host: "petstore.swagger.io",
      basePath: "/v2",
      servers: [url],
    },
  },
  apis: ["./src/entities/*/*.controller.js"],
};

// ------------------------------------------------------

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// ------------------------------------------------------

const swagger = {
  server: swaggerUi.serve,
  setup: swaggerUi.setup(swaggerDocs),
};

// ------------------------------------------------------

export default swagger;
