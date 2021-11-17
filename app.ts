import express from "express";
import http from "http";
import Knex from "knex";
import path from "path";
import { Server as SocketIO } from "socket.io";
import { isLoggedIn } from "./utils/guards";
import { logger } from "./utils/logger";

const app = express();
const server = new http.Server(app);
export const io = new SocketIO(server);

const knexConfig = require("./knexfile");
export const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);

app.use(express.json());

app.use(express.static(path.join(__dirname, "private")));
app.use(isLoggedIn, express.static(path.join(__dirname, "public")));

// const API_VERSION = "/api";
// app.use(API_VERSION, routes);

const PORT = 8080;
server.listen(PORT, () => {
  logger.info(`[INFO] listening to port ${PORT}`);
});
