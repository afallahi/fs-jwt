import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from "@nestjs/swagger";
import { SWAGGER_CONFIG } from "./swagger.config";


export function createDocument(app: INestApplication): OpenAPIObject {
    const docBuilder = new DocumentBuilder()
    .setTitle(SWAGGER_CONFIG.title)
    .setDescription(SWAGGER_CONFIG.description)
    .setVersion(SWAGGER_CONFIG.version)
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT'}, 'access-token')

    const options = docBuilder.build();
    return SwaggerModule.createDocument(app, options);
}