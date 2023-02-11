"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_errors_1 = __importDefault(require("http-errors"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const getEnv_1 = __importDefault(require("./utils/getEnv"));
const redisClient_1 = __importDefault(require("./utils/redisClient"));
const routes_1 = __importDefault(require("./routes"));
const { authRouter, userRouter, swapRouter, transactionRouter, priceRouter } = routes_1.default;
const port = (0, getEnv_1.default)('PORT', '5050');
const RedisStore = (0, connect_redis_1.default)(express_session_1.default);
const app = (0, express_1.default)();
app.set('views', path_1.default.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', port);
app.use((0, cors_1.default)({
    origin: [
        'http://localhost:3000',
        'https://localhost:3000',
        'https://dubnjq842z47s.cloudfront.net/',
        'http://dubnjq842z47s.cloudfront.net/',
        'http://cds-application-loadbalancer-1074230522.ap-northeast-2.elb.amazonaws.com',
        'http://cds-client.s3-website.ap-northeast-2.amazonaws.com',
        'https://d999baeavtte2.cloudfront.net',
    ],
    credentials: true,
}));
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)((0, getEnv_1.default)('COOKIE_SECRET')));
app.use((0, express_session_1.default)({
    secret: (0, getEnv_1.default)('COOKIE_SECRET'),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 15 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: 'none',
    },
    store: new RedisStore({ client: redisClient_1.default }),
}));
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
const swaggerDocument = yamljs_1.default.load(path_1.default.join(__dirname, 'swagger', 'cds.yaml'));
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/swaps', swapRouter);
app.use('/transactions', transactionRouter);
app.use('/prices', priceRouter);
app.use('/health', (req, res, next) => {
    return res.status(200).json({ message: 'health check success!' });
});
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404, 'There is no router'));
});
app.use((err, req, res, _) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    return res.status(err.status || 500).json(err.message);
});
exports.default = app;
//# sourceMappingURL=app.js.map