declare module "swagger-jsdoc" {
  import { OpenAPIV3 } from "openapi-types";

  interface Options {
    definition: OpenAPIV3.Document;
    apis: string[];
  }

  export default function swaggerJsDoc(options: Options): OpenAPIV3.Document;
}
