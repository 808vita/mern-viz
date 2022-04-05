const express = require("express");

const router = express.Router();

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VizSchema = new Schema({}, { strict: false });
const Viz = mongoose.model("viz-project", VizSchema, "viz-project");

router.get("/", async (req, res) => {
	try {
		const vizData = await Viz.find({}); //then here we will fetch "that user all data from mongo db expecpt password by the help of id"
		// console.log(vizData);
		res.json(vizData);
		// res.send("serve all data from monogodb here");
	} catch (e) {
		console.log(e);
		res.status(500).send("Internal Server Occured");
	}
});

module.exports = router;
