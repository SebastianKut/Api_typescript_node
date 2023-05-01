"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var env = require("dotenv");
// Make sure that .env get loaded before rest of the app
var envVariable = env.config();
if (envVariable.error) {
    console.log('Error loading .env');
    process.exit(1);
}
var express = require("express");
var root_1 = require("./routes/root");
var utils_1 = require("./utils");
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
        console.log("Server is running at http://localhost:".concat(port));
    });
}
setupExpress();
startServer();
