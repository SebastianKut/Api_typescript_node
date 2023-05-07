"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var env = require("dotenv");
// Make sure that .env get loaded before rest of the app
var envVariable = env.config();
if (envVariable.error) {
    // We are not using winston logger here because it uses env variable
    console.log('Error loading .env');
    process.exit(1);
}
require("reflect-metadata"); // this is for typeorm to work properly
var express = require("express");
var root_1 = require("./routes/root");
var utils_1 = require("./utils");
var logger_1 = require("./logger");
var data_source_1 = require("./data-source");
var app = express();
function setupExpress() {
    app.route('/').get(root_1.root);
}
function startServer() {
    var portArg = process.argv[2], portEnv = process.env.PORT;
    var port;
    if ((0, utils_1.isInteger)(portEnv))
        port = parseInt(portEnv);
    if (!port && (0, utils_1.isInteger)(portArg))
        port = parseInt(portArg);
    if (!port)
        port = 9000;
    app.listen(port, function () {
        logger_1.logger.info("Server is running at http://localhost:".concat(port));
    });
}
data_source_1.AppDataSource.initialize()
    .then(function () {
    logger_1.logger.info('The database source has been initialized successfully');
    setupExpress();
    startServer();
})
    .catch(function (err) {
    logger_1.logger.error('Error initializing database', err);
    process.exit();
});
