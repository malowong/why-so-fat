import express from "express";
import http from "http";
import Knex from "knex";
import path from "path";
import { Server as SocketIO } from "socket.io";
import { isLoggedInStatic } from "./utils/guards";
import { logger } from "./utils/logger";
import expressSession from "express-session";

const app = express();
app.use(express.json({limit: '30mb'}));
app.use(
  expressSession({
    secret: "Tecky Academy teaches typescript",
    resave: true,
    saveUninitialized: true,
  })
);

const server = new http.Server(app);
export const io = new SocketIO(server);

const knexConfig = require("./knexfile");
export const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);

app.use((req, res, next) => {
  const cur = new Date().toISOString();
  logger.info(`${cur} req path: ${req.path} method: ${req.method}`);
  res.setHeader('app-version','1.2.3')
  next();
});

import { routes } from "./routes";
const API_VERSION = "/api";
app.use(API_VERSION, routes);

app.use(express.static(path.join(__dirname, "public")));
app.use(isLoggedInStatic, express.static(path.join(__dirname, "uploads")));
app.use(isLoggedInStatic, express.static(path.join(__dirname, "private"), { index: "home-page.html" }));

const PORT = 8080;
server.listen(PORT, () => {
  logger.info(`[INFO] listening to port ${PORT}`);
});
