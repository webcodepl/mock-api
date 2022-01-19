"use strict";
const express = require("express");
const serverless = require("serverless-http");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");

const responsesDir = "responses";

app.use(cors());

const router = express.Router();

router.post("/token", function (req, res) {
	res.end(
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiS0xBQ0hPV1NLSSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiLTYiLCJleHAiOjE2NDA2Mzc5ODIsImlzcyI6Ik54QXBpIiwiTnhVc2VySWRlbnRpdHkiOnsiVXNlcklkIjotNiwiQWNyb255bSI6IktMQUNIT1dTS0kiLCJDb250cmFjdG9ySWQiOjAsIlVzZXJUeXBlIjoxfX0.2kiqKHOIkpfABu3SPyy5m0cxhYavMEIy1MTwDI9QZSQ"
	);
});

router.get("/api/quality-control/orders/new", function (req, res) {
	fs.readFile(
		__dirname + "/" + responsesDir + "/" + "orders.json",
		"utf8",
		function (err, data) {
			res.end(data);
		}
	);
});

router.get("/api/quality-control/orders/:id/items", function (req, res) {
	fs.readFile(
		__dirname + "/" + responsesDir + "/" + "order-details.json",
		"utf8",
		function (err, data) {
			res.end(data);
		}
	);
});

router.post("/api/quality-control/orders/:id/items", function (req, res) {
	fs.readFile(
		__dirname + "/" + responsesDir + "/" + "order-item-result.json",
		"utf8",
		function (err, data) {
			res.end(data);
		}
	);
});

router.get("/api/quality-control/orders/archive", function (req, res) {
	fs.readFile(
		__dirname + "/" + responsesDir + "/" + "archive.json",
		"utf8",
		function (err, data) {
			res.end(data);
		}
	);
});

router.get("/", (req, res) => {
	res.writeHead(200, { "Content-Type": "text/html" });
	res.write("<h1>Hello from Express.js!</h1>");
	res.end();
});
router.get("/another", (req, res) => res.json({ route: req.originalUrl }));
router.post("/", (req, res) => res.json({ postBody: req.body }));

app.use(bodyParser.json());
app.use("/.netlify/functions/api", router); // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);
