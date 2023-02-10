"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.specs = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const options = {
    swaggerDefinition: {
        info: {
            title: 'SSukSSuk API',
            version: '1.0.0',
            description: 'SSSS API with express',
        },
        host: 'localhost:3001',
        basePath: './swagger',
    },
    apis: ['./routes/*.js', './swagger/*'],
};
exports.specs = (0, swagger_jsdoc_1.default)(options);
//# sourceMappingURL=swagger.js.map