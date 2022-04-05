const express = require("express");
const app = express();

const path = require("path");
var cors = require("cors");
const dataRoutes = require("./routes/dataRoutes");

const startMongoDbConnection = require("./db");

const dotenv = require("dotenv");
const port = process.env.PORT || 5000;

dotenv.config();
startMongoDbConnection(); //just printing wether connected to database or not

app.use(cors());
app.use(express.json());

// ----------------------------------------------

const __dirname1 = path.resolve();
app.use("/api/data", dataRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname1, "/frontend/build")));

	app.get("*", (req, res) =>
		res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
	);
} else {
	app.get("/", (req, res) => {
		res.json({ hello: "hello from server" });
	});
}

// ----------------------------------------------------

app.listen(port, console.log("server running on port " + port));
