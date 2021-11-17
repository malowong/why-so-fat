import express from "express";
import http from "http";
import Knex from "knex";
import path from "path";
import { Server as SocketIO } from "socket.io";
import { logger } from "./utils/logger";
import expressSession from "express-session";

const app = express();
const server = new http.Server(app);
export const io = new SocketIO(server);

const knexConfig = require("./knexfile");
console.log(knexConfig[process.env.NODE_ENV || "development"]);
export const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);

app.use(express.json());
app.use(
  expressSession({
    secret: "Tecky Academy teaches typescript",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(express.static(path.join(__dirname, "public"), { index: "loginPage.html" }));

import { routes } from "./routes";
const API_VERSION = "/api";
app.use(API_VERSION, routes);

const PORT = 8080;
server.listen(PORT, () => {
  logger.info(`[INFO] listening to port ${PORT}`);
});
