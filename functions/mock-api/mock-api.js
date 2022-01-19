const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");
const serverless = require("serverless-http");
const bodyParser = require("body-parser");

const responsesDir = "responses";

app.use(cors());
app.use(bodyParser);

app.post("/token", function (req, res) {
	res.end(
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiS0xBQ0hPV1NLSSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiLTYiLCJleHAiOjE2NDA2Mzc5ODIsImlzcyI6Ik54QXBpIiwiTnhVc2VySWRlbnRpdHkiOnsiVXNlcklkIjotNiwiQWNyb255bSI6IktMQUNIT1dTS0kiLCJDb250cmFjdG9ySWQiOjAsIlVzZXJUeXBlIjoxfX0.2kiqKHOIkpfABu3SPyy5m0cxhYavMEIy1MTwDI9QZSQ"
	);
});

app.get("/api/quality-control/orders/new", function (req, res) {
	fs.readFile(
		__dirname + "/" + responsesDir + "/" + "orders.json",
		"utf8",
		function (err, data) {
			res.end(data);
		}
	);
});

app.get("/api/quality-control/orders/:id/items", function (req, res) {
	fs.readFile(
		__dirname + "/" + responsesDir + "/" + "order-details.json",
		"utf8",
		function (err, data) {
			res.end(data);
		}
	);
});

app.post("/api/quality-control/orders/:id/items", function (req, res) {
	fs.readFile(
		__dirname + "/" + responsesDir + "/" + "order-item-result.json",
		"utf8",
		function (err, data) {
			res.end(data);
		}
	);
});

app.get("/api/quality-control/orders/archive", function (req, res) {
	fs.readFile(
		__dirname + "/" + responsesDir + "/" + "archive.json",
		"utf8",
		function (err, data) {
			res.end(data);
		}
	);
});

module.exports.handler = serverless(app);

// const server = app.listen(9999, function () {
// 	const host = server.address().address;
// 	const port = server.address().port;
// 	console.log("Example app listening at http://%s:%s", host, port);
// });
